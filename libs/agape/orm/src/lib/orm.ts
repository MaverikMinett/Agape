import { Document, Model, ViewDescriptor } from '@agape/model';
import { classExtends, inflate } from '@agape/object';
import { pluralize, camelize } from '@agape/string'
import { Class, Dictionary } from '@agape/types'
import { Collection, ObjectId } from 'mongodb';

import { MongoDatabase } from './databases/mongo.database';
import { InsertQuery } from './mongo/queries/insert.query';

import { FilterCriteria } from './types'
import { itemToRecord, selectCriteriaFromFilterCriteria } from './util';
import { Exception } from '@agape/exception';

export interface DocumentLocatorParams {
    databaseName?: string;
    collectionName?: string;
}

export class DocumentLocator {
    databaseName: string;
    collectionName: string;
    collection: Collection;

    constructor( params:Pick<DocumentLocator, keyof DocumentLocator> ) {
        params && Object.assign(this, params)
    }
}

export class Orm {


    debug: boolean = false

    databases: Map<string, MongoDatabase> = new Map()

    documents: Map<Class, DocumentLocator> = new Map()

    database( name: string ) {
        return this.databases.get(name)
    }

    registerDatabase( identifier: string, database: MongoDatabase ) {
        this.databases.set(identifier, database)
    }

    registerDocument( model: Class, params: DocumentLocatorParams={} ) {

        if ( ! classExtends(model, Document) ) {
            throw new Error(`Model ${model.name} must inherit from Document`)
        }

        const databaseName = params?.databaseName ?? 'default';
        const collectionName = params?.collectionName ?? camelize(pluralize(model.name));

        const existing = Array.from(this.documents.values()).find( locator => 
            locator.databaseName === databaseName && locator.collectionName === collectionName 
        )
        if ( existing ) {
            throw new Error(`A document is already mapped to collection ${collectionName} on database` +
            `${databaseName}.`)
        }

        const database = this.databases.get(databaseName)

        if ( ! database )
            throw new Error(`Error registering model ${model.name}, database with identifier ${databaseName} does not exit`)

        // Determine the collection
        const collection = database.getCollection(collectionName)

        // Create a locator object
        const locator = new DocumentLocator({ databaseName, collectionName, collection})

        this.documents.set(model, locator)
    }

    /**
     * Register a model with the orm
     * @deprecated
     * @param model 
     * @param params 
     */
    registerModel( model: Class, params: DocumentLocatorParams={} ) {

        console.log(`RegisterModel is deprecated, use register document instead`)

        const databaseName = params?.databaseName ?? 'default';
        const collectionName = params?.collectionName ?? camelize(pluralize(model.name));

        const database = this.databases.get(databaseName)
        if ( ! database )
            throw new Error(`Error registering model ${model.name}, database with identifier ${databaseName} does not exit`)

        // Determine the collection
        const collection = database.getCollection(collectionName)

        // Create a locator object
        const locator = new DocumentLocator({ databaseName, collectionName, collection})

        this.documents.set(model, locator)

    }

    insert<T extends Class>( model: T, item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {

        const locator = this.getLocator(model)

        const collection = locator.collection

        return new InsertQuery<T>(model, collection, item)
    }

    retrieve<T extends Class>( model: T, id: string ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new RetrieveQuery<T>(this, model, collection, id)
    }

    lookup<T extends Class>( model: T, filter: FilterCriteria<InstanceType<T>> ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new LookupQuery<T>(this, model, collection, filter)
    }

    update<T extends Class>( model: T, id: string,  item: InstanceType<T> ): UpdateQuery<T>
    update<T extends Class>( model: T, filter: FilterCriteria<InstanceType<T>>,  item: InstanceType<T> ): UpdateQuery<T>
    update<T extends Class>( model: T, selector: string|FilterCriteria<InstanceType<T>>, item: InstanceType<T> ): UpdateQuery<T> {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new UpdateQuery(this, model, collection, selector, item)
    }

    list<T extends Class>( model: T, filter?: FilterCriteria<InstanceType<T>> ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        const query = new ListQuery<T>(this, model, collection, filter)

        return query
    }

    delete<T extends Class>(model: T, id: string): DeleteQuery<T>
    delete<T extends Class>(model: T, filter: FilterCriteria<InstanceType<T>>): DeleteQuery<T>
    delete<T extends Class>(model: T, selector: string|FilterCriteria<InstanceType<T>>): DeleteQuery<T> {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new DeleteQuery<T>(this, model, collection, selector)
    }



    getLocator<T extends Class>(view: T) {
        const descriptor = Model.descriptor(view)

        const model: Class = descriptor instanceof ViewDescriptor
            ? descriptor.model 
            : view

        const locator: DocumentLocator = this.documents.get(model)

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
                if (objectId !== undefined && objectId !== null) {
                    const idString = objectId.toString()
                    item[field.name] = await this.orm.retrieve(field.designType, idString).exec()
                }
                else {
                    item[field.name] = record[field.name]
                }
            }
            else if ( field.foreignKey === true ) {
                if ( record[field.name] !== undefined && record[field.name] !== null ) {
                    item[field.name] = (record[field.name] as ObjectId).toString()
                }
                else {
                    item[field.name] = record[field.name]
                }
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
                    if (objectId !== undefined && objectId !== null) {
                        const idString = objectId.toString()
                        foreignKeys[field.name] ??= new Set<string>()
                        foreignKeys[field.name].add(idString)
                    }
                    else {
                        item[field.name] = record[field.name]
                    }
                }
                else if ( field.foreignKey === true ) {
                    if ( record[field.name] !== undefined && record[field.name] !== null ) {
                        item[field.name] = (record[field.name] as ObjectId).toString()
                    }
                    else {
                        item[field.name] = record[field.name]
                    }
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
                { [filterFieldName]: Array.from(foreignKeys[foreignKeyField]) as any }
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
                if ( foreignObjectId !== undefined && foreignObjectId !== null ) {
                    let foreignObjectIdString = foreignObjectId.toString()
                    items[i][foreignKeyField] = foreignObjects[foreignKeyField][foreignObjectIdString]
                }
                else {
                    items[i][foreignKeyField] = foreignObjectId
                }
                
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

    constructor( public orm: Orm, public model: T, public collection: Collection, public filter: FilterCriteria<InstanceType<T>> ) {

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
        if ( this.orm.debug ) {
            console.log("FILTER", this.filter )
        }

        const select = selectCriteriaFromFilterCriteria( descriptor, this.filter )

        if ( this.orm.debug ) {
            console.log("SELECT", select )
        }
        
        /* mongo query */
        const record = await this.collection.findOne( select, { projection } )

        /* record not found */
        if ( ! record ) return undefined

        const item = {}
        item[primaryField.name] = record[primaryField.name]

        for ( let field of otherFields ) {
            if ( field.designType instanceof Function && field.designType.prototype as any instanceof Document ) {
                const objectId: ObjectId = record[field.name]
                if (objectId !== undefined && objectId !== null) {
                    const idString = objectId.toString()
                    item[field.name] = await this.orm.retrieve(field.designType, idString).exec()
                }
                else {
                    item[field.name] = record[field.name]
                }
            }
            else if ( field.foreignKey === true ) {
                if ( record[field.name] !== undefined && record[field.name] !== null ) {
                    item[field.name] = (record[field.name] as ObjectId).toString()
                }
                else {
                    item[field.name] = record[field.name]
                }
            }
            else {
                item[field.name] = record[field.name]
            }
        }

        /* record */
        return item as any
        /* record */
        return record as any
    }

    

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}

export class UpdateQuery<T extends Class> {

    id: ObjectId

    filter: FilterCriteria<InstanceType<T>>

    constructor( orm: Orm, model: T, collection: Collection, id: string, item: InstanceType<T> )
    constructor( orm: Orm, model: T, collection: Collection, filter: FilterCriteria<InstanceType<T>>, item: Pick<T, keyof T> )
    constructor( orm: Orm, model: T, collection: Collection, selector: string|FilterCriteria<InstanceType<T>>, item: InstanceType<T> )
    constructor( public orm: Orm, public model: T, public collection: Collection, selector: string|FilterCriteria<InstanceType<T>>, public item: InstanceType<T> ) {
        if ( typeof selector === 'string' ) {
            try {
                this.id = new ObjectId(selector)
            }
            catch {
                throw new Error(`Invalid record ${this.id}`)
            }
        }
        else {
            this.filter = selector
        }
    }

    async exec( ) {
        const descriptor = Model.descriptor(this.model)

        /* selection */
        let select: Dictionary 
        if ( this.id ) select = { _id: this.id }
        if ( this.filter ) select = selectCriteriaFromFilterCriteria( descriptor, this.filter )

        if ( this.orm.debug ) {
            console.log("SELECT", select )
        }

        /* record */
        const record = itemToRecord(this.model, this.item)

        const result = await this.collection.updateOne( select, { $set: record } )

        if ( result.matchedCount === 0 ) {
            throw new Exception(404, `Could not update ${this.model.name} record with id ${this.id}, record not found`)
        }
        if ( result.acknowledged === false ) {
            throw new Exception(500, `Could not update ${this.model.name} record with id ${this.id}, database did not acknowledge request`)
        }
    }

}


export class DeleteQuery<T extends Class> {

    id: ObjectId

    filter: FilterCriteria<InstanceType<T>>

    constructor( orm: Orm,  model: T, collection: Collection, id: string )
    constructor( orm: Orm,  model: T, collection: Collection, filter: FilterCriteria<InstanceType<T>> )
    constructor( orm: Orm,  model: T, collection: Collection, selector: string|FilterCriteria<InstanceType<T>> )
    constructor( public orm: Orm, public model: T, public collection: Collection, selector: string|FilterCriteria<InstanceType<T>> ) {
        if ( typeof selector === 'string' ) {
            try {
                this.id = new ObjectId(selector)
            }
            catch {
                throw new Error(`Invalid record id ${this.id}`)
            }
        }
        else {
            this.filter = selector
        }
    }

    async exec( ) {
        console.log("Perform delete")
        const descriptor = Model.descriptor(this.model)

        /* selection */
        let select: Dictionary 
        if ( this.id ) select = { _id: this.id }
        if ( this.filter ) select = selectCriteriaFromFilterCriteria( descriptor, this.filter )

        if ( this.orm.debug ) {
            console.log("DELETE", select )
        }

        const result = await this.collection.deleteOne(
            select
        )

        if ( result.deletedCount === 0 ) {
            throw new Exception(404, `Could not delete ${this.model.name} record where ${JSON.stringify(select)}, record not found`)
        }
        if ( result.acknowledged === false ) {
            throw new Exception(500, `Could not delete ${this.model.name} record where ${JSON.stringify(select)}, database did not acknowledge request`)
        }

        return result
    }

}