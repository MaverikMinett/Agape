import { orm, MongoConnection, MongoDatabase } from '@agape/orm'
import { Organization } from './app/shared/documents/organization.document';
import { User } from './app/shared/documents/user.document';
import { Event } from './app/shared/documents/event.document';
import bcrypt from 'bcryptjs';

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'zed-saas-api'

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
    orm.registerDocument(Organization)
    orm.registerDocument(User)
    orm.registerDocument(Event)

    // ensure there is an admin user on startup
    {
        const existing = await orm.retrieve(User, { username: /^admin$/i }).exec()

        if ( ! existing ) {
            const password = 'password'
            const salt = bcrypt.genSaltSync(10)
            const salted = bcrypt.hashSync(password, salt);
            
            const admin = new User({
                organization: null,
                firstName: 'Admin',
                lastName: 'Admin',
                username: 'admin',
                password: salted,
                isAdmin: true,
                email: 'admin@example.com'
            })
    
            await orm.insert(User, admin).exec()
            console.log(`Added admin user with password 'password'`)
        }
    }


}




