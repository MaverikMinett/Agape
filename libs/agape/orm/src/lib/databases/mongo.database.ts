import { Db } from 'mongodb'
import { MongoConnection } from '../connections/mongo.connection';
import { Database } from './database';
import { Class } from '../../../../object/src';


export class MongoDatabase extends Database {

    public connection: MongoConnection

    public databaseName: string

    public db: Db

    constructor( connection: MongoConnection, databaseName: string ) {
        super()
        this.connection = connection
        this.databaseName = databaseName

        this.db = this.connection.client.db()
    }

    collection( model: Class ) {
        // get the collection name from the model
        // TODO: Allow setting the collection name on the model descriptor, for now this is
        // just using the model class name as the collection name

        const collectionName = model.name;
        return this.db.collection( collectionName )
    }

    getCollection( collectionName: string ) {
        return this.db.collection( collectionName )
    }

}