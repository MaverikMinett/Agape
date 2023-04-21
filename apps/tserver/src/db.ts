import { MongoClient, Db } from 'mongodb'

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url)

const dbName = 'zed'

let db: Db

async function connect() {

    await client.connect()
    
    db = client.db(dbName)
}

export default db;
export { connect, db };