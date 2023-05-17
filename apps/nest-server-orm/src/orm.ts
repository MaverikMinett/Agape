import { orm, MongoConnection, MongoDatabase } from '@agape/orm'



const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'zed'



import { Event, User, Organization } from 'lib-platform';

export async function connectOrm() {
    const connection = new MongoConnection(DATABASE_URL);
    try {
        console.log(`Connecting to ${DATABASE_URL}`)
        await connection.connect()
        console.log(`Connected successfully`)
    }
    catch ( error ) {
        console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
    }


    const database = new MongoDatabase(connection, DATABASE_NAME)
    orm.registerDatabase('default', database)
    orm.registerModel(Event)
    orm.registerModel(User)
    orm.registerModel(Organization)
}




