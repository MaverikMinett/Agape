import { MongoClient, Db } from 'mongodb'

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url)

const dbName = 'zed'

let _db: Db

export async function connect() {

    await client.connect()

    _db = client.db('zed')
}

export function db() {
    return _db
}

export default db;

