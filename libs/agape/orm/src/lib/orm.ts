import { Document, Model, ViewDescriptor } from '@agape/model';
import { inflate } from '@agape/object';
import { pluralize, camelize } from '@agape/string'
import { Class, Dictionary } from '@agape/types'
import { Collection, ObjectId } from 'mongodb';

import { MongoDatabase } from './databases/mongo.database';

import { DeleteQuery } from './mongo/queries/delete.query';
import { UpdateQuery } from './mongo/queries/update.query';
import { InsertQuery } from './mongo/queries/insert.query';

import { FilterCriteria } from './types'
import { selectCriteriaFromFilterCriteria } from './util';

export interface ModelLocatorParams {
    databaseName?: string;
    collectionName?: string;
}

export class ModelLocator {
    databaseName: string;
    collectionName: string;
    collection: Collection;

    constructor( params:Pick<ModelLocator, keyof ModelLocator> ) {
        params && Object.assign(this, params)
    }
}

export class Orm {


    debug: boolean = false

    databases: Map<string, MongoDatabase> = new Map()

    models: Map<Class, ModelLocator> = new Map()

    database( name: string ) {
        return this.databases.get(name)
    }

    registerDatabase( identifier: string, database: MongoDatabase ) {
        this.databases.set(identifier, database)
    }

    // registerEntity( entity: Class ) {
        // TODO: Get the database from the entity definition
        // const database = Agape.Entity(entity).database
        // TODO: Allow the database to be passed in as a parameter
        // this.registerModel( entity, database )
    // }

    registerModel( model: Class, params: ModelLocatorParams={} ) {

        // console.log(`Registering model ${model.name}`)

        // TODO: Throw an error if the class passed in is a View and not a plain Model
        // Only Models can be registered here

        const databaseName = params?.databaseName ?? 'default';
        const collectionName = params?.collectionName ?? camelize(pluralize(model.name));

        // console.log("Collection", collectionName)

        const database = this.databases.get(databaseName)
        if ( ! database )
            throw new Error(`Error registering model ${model.name}, database with identifier ${databaseName} does not exit`)

        // TODO: Don't allow two models to map to the same collection on the same database
        // will need to keep some sort of registry which can be validated against here.
        // dev should see an error that mapping two models to the same table/collection
        // is not possible, and that a View should be used instead

        // Determine the collection
        const collection = database.getCollection(collectionName)

        // Create a locator object
        const locator = new ModelLocator({ databaseName, collectionName, collection})

        this.models.set(model, locator)

        // this.models.set(model, database)
    }

    insert<T extends Class>( model: T, item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {

        const locator = this.getLocator(model)

        const collection = locator.collection

        // // TODO: validate the item

        // // TODO: serialize the item

        return new InsertQuery<T>(model, collection, item)


        // try {
        //     const response = await collection.insertOne( item )
        //     item.id = response.insertedId.toString()
        //     return item.id
        // }
        // catch (error) {
        //     console.log("Error inserting record into Foo", error)
        // }
        // console.log(`Success`)
    }

    retrieve<T extends Class>( model: T, id: string ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new RetrieveQuery<T>(this, model, collection, id)
    }

    lookup<T extends Class>( model: T, filter: Dictionary ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new LookupQuery<T>(this, model, collection, filter)
    }

    update<T extends Class>(model: T, id: string, item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new UpdateQuery(model, collection, id, item)
    }

    list<T extends Class>( model: T, filter?: FilterCriteria<InstanceType<T>> ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        const query = new ListQuery<T>(this, model, collection, filter)

        return query
    }

    // lookup<T extends Class>( model: T, filter: any ) {
    //     const collection = this.models.get(model).collection
    //
    //     return new LookupQuery<T>(model, collection)
    // }

    delete<T extends Class>(model: T, id: string ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new DeleteQuery<T>(model, collection, id)
    }


    getLocator<T extends Class>(view: T) {
        const descriptor = Model.descriptor(view)

        const model: Class = descriptor instanceof ViewDescriptor
            ? descriptor.model 
            : view

        const locator: ModelLocator = this.models.get(model)

        if ( ! locator ) {
            throw new Error(
                `Cannot find model locator for ${view.name}, ` 
                + `${model.name} has not been registered with the orm`
            )
        }

        return locator
    }


}

/**
 * Retrieve query to lookup a single record by it's ID
 */
export class RetrieveQuery<T extends Class> {

    constructor( public orm: Orm, public model: T, public collection: Collection, public id: string ) {

    }

    async exec( ): Promise<Pick<InstanceType<T>, keyof InstanceType<T>>> {
        let _id: ObjectId
        try {
            _id = new ObjectId(this.id)
        }
        catch {
            throw new Error(`Invalid record ${this.id}`)
        }

        const descriptor = Model.descriptor(this.model)

        /* projection */
        const projection: Dictionary = { _id: 0 }

        const primaryField = descriptor.fields.all().find( f => f.primary )
        if ( primaryField ) {
            projection[primaryField.name] = { $toString: "$_id" }
        }

        const otherFields = descriptor.fields.all().filter( f => ! f.primary )
        for ( let field of otherFields ) {
            projection[field.name] = 1
        }

        /* selection */
        const selection: Dictionary = { _id }
        
        /* mongo query */
        const record = await this.collection.findOne( selection, { projection } )

        /* record not found */
        if ( ! record ) return undefined

        const item = {}
        item[primaryField.name] = record[primaryField.name]

        for ( let field of otherFields ) {
            if ( field.designType instanceof Function && field.designType.prototype as any instanceof Document ) {
                const objectId: ObjectId = record[field.name]
                const idString = objectId.toString()
                item[field.name] = await this.orm.retrieve(field.designType, idString).exec()
            }
            else {
                item[field.name] = record[field.name]
            }
        }

        /* record */
        return item as any
    }

    async inflate( ): Promise<InstanceType<T>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}


/**
 * List query to retrieve a list of filtered records
 */
export class ListQuery<T extends Class> {

    constructor( public orm: Orm, public model: T, public collection: Collection, public filter?: FilterCriteria<T> ) {

    }

    async exec( ): Promise<Array<Pick<InstanceType<T>, keyof InstanceType<T>>>> {

        const descriptor = Model.descriptor(this.model)

        const projection: Dictionary = { _id: 0 }

        const primaryField = descriptor.fields.all().find( f => f.primary )
        if ( primaryField ) {
            projection[primaryField.name] = { $toString: "$_id" }
        }

        const otherFields = descriptor.fields.all().filter( f => ! f.primary )
        for ( let field of otherFields ) {
            projection[field.name] = 1
        }

        if ( this.orm.debug ) {
            console.log("FILTER", this.filter )
        }

        const select = selectCriteriaFromFilterCriteria( descriptor, this.filter )

        if ( this.orm.debug ) {
            console.log("SELECT", select )
        }

        // select records from database
        const records = await this.collection.find(
            select,
            { projection }
        )
        .toArray()

        const items = []

        const foreignKeys:Dictionary<Set<string>> = {}

        // create items from database records
        for ( let record of records ) {
            const item = {}
            item[primaryField.name] = record[primaryField.name]

            for ( let field of otherFields ) {

                // handle foreign objects that need to be populated
                if ( field.designType instanceof Function && field.designType.prototype as any instanceof Document ) {
                    const objectId: ObjectId = record[field.name]
                    foreignKeys[field.name] ??= new Set<string>()
                    foreignKeys[field.name].add(objectId.toString())
                }
                else {
                    item[field.name] = record[field.name]
                }
            }

            items.push(item)
        }

        const foreignObjects: Dictionary<Dictionary<object>> = {}
        for ( let foreignKeyField of Object.keys(foreignKeys) ) {
            const foriegnDescriptor = Model.descriptor(descriptor.fields.get(foreignKeyField).designType as Class)
            const filterFieldName = foriegnDescriptor.primaryField.name + '__in'
            const objectsList = await this.orm.list(
                descriptor.fields.get(foreignKeyField).designType as Class, 
                { [filterFieldName]: Array.from(foreignKeys[foreignKeyField]) }
            ).exec()
            const objectsDict: Dictionary<object> = { }
            for ( let o of objectsList ) {
                objectsDict[ foriegnDescriptor.primaryField.getValue(o) ] = o
            }
            foreignObjects[foreignKeyField] = objectsDict
        }

        for ( let i = 0; i < records.length; i++ ) {
            const record = records[i]
            for ( let foreignKeyField of Object.keys(foreignKeys) ) {
                let foreignObjectId = record[foreignKeyField]
                let foreignObjectIdString = foreignObjectId.toString()
                items[i][foreignKeyField] = foreignObjects[foreignKeyField][foreignObjectIdString]
            }
        }

        return items as any[]
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const records = await this.exec()
        return inflate<T>( [this.model], records )
    }
}

export class LookupQuery<T extends Class> {

    constructor( public orm: Orm, public model: T, public collection: Collection, public filter: Dictionary ) {

    }

    async exec( ): Promise<Pick<InstanceType<T>, keyof InstanceType<T>>> {

        const descriptor = Model.descriptor(this.model)

        /* projection */
        const projection: Dictionary = { _id: 0 }

        const primaryField = descriptor.fields.all().find( f => f.primary )
        if ( primaryField ) {
            projection[primaryField.name] = { $toString: "$_id" }
        }

        const otherFields = descriptor.fields.all().filter( f => ! f.primary )
        for ( let field of otherFields ) {
            projection[field.name] = 1
        }

        /* selection */
        const selection: Dictionary = this.filter
        
        /* mongo query */
        const record = await this.collection.findOne( selection, { projection } )

        /* record not found */
        if ( ! record ) return undefined

        /* record */
        return record as any
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}