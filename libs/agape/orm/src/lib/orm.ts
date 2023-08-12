import { Class, Dictionary } from '@agape/types'
import { Collection } from 'mongodb';
import { MongoDatabase } from './databases/mongo.database';
import { RetrieveQuery } from './mongo/queries/retrieve.query';
import { ListQuery } from './mongo/queries/list.query';
import { DeleteQuery } from './mongo/queries/delete.query';
import { UpdateQuery } from './mongo/queries/update.query';
import { pluralize, camelize } from '@agape/string'
import { InsertQuery } from './mongo/queries/insert.query';
import { Model, ViewDescriptor } from '@agape/model';
import { LookupQuery } from './mongo/queries/lookup.query';


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

        return new LookupQuery<T>(model, collection, filter)
    }

    update<T extends Class>(model: T, id: string, item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        return new UpdateQuery(model, collection, id, item)
    }

    list<T extends Class>( model: T ) {
        const locator = this.getLocator(model)

        const collection = locator.collection

        const query = new ListQuery<T>(model, collection)

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
