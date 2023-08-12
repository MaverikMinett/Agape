import { DatabaseConnection } from './connection';

import { Db, MongoClient }  from 'mongodb';

export class MongoConnection extends DatabaseConnection {

    client: MongoClient

    constructor( public url: string ) {
        super();
        this.client = new MongoClient(url)
    }

    async connect( ) {
        await this.client.connect()
    }

    async disconnect() {
        await this.client.close()
    }

}