import { Orm, MongoConnection, MongoDatabase } from '@agape/orm';

import { Model } from '@agape/model'

const DATABASE_URL = 'mongodb://localhost:27017';

@Model class Foo {

    id: string

    name: string

    age: number

    constructor( params: Partial<Pick<Foo, keyof Foo>>) {
        Object.assign( this, params )
    }

}

interface IFoo {
    id: string
    name: string
    age: number
}


export async function example() {
    const orm = new Orm()


    /** Connect **/
    const connection = new MongoConnection(DATABASE_URL);

    try {
        console.log(`Connecting to ${DATABASE_URL}`)
        await connection.connect()
        console.log(`Connected successfully`)
    }
    catch ( error ) {
        console.log(`Could not connect to ${DATABASE_URL}: ${error}`)
    }

    console.log(`Connecting to database "foo"`)
    const database = new MongoDatabase(connection, 'foo')
    console.log(`Connected to database "foo"`)

    orm.registerDatabase('default', database)


    /** Register Models **/
    orm.registerModel(Foo)

    /** Insert a record **/
    console.log("** INSERT **")
    const foo = new Foo({ name: 'Test', age: 42 })
    let insertedId: string
    try {
        await orm.insert(Foo, foo)
        insertedId = foo.id;
    }
    catch (error) {
        console.log("Error inserting record into Foo", error)
    }

    /** Retrieve a record **/
    console.log("** RETRIEVE **")
    try {
        const fooPojo = await orm.retrieve(Foo, insertedId).exec()
        console.log(`Retrieved record`, fooPojo)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** Retrieve record and specify an explicit interface **/
    console.log("** RETRIEVE WITH INTERFACE **")
    try {
        const fooPojo: IFoo = await orm.retrieve(Foo, insertedId).exec()
        console.log(`Retrieved record`, fooPojo)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** Inflate a record **/
    console.log("** INFLATE **")
    try {
        const fooObject = await orm.retrieve(Foo, insertedId).inflate()
        console.log(`Retrieved object`, fooObject)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** List records **/
    console.log("** LIST **")
    try {
        const fooPojo = await orm.list(Foo).exec()
        console.log(`Retrieved records`, fooPojo)
    }
    catch (error) {
        console.log("Error retrieving record from Foo", error)
    }

    /** Delete a record **/
    console.log("** DELETE **")
    try {
        await orm.delete(Foo, insertedId).exec()
        console.log(`Deleted record ${insertedId}`)
    }
    catch (error) {
        console.log("Error deleting record from Foo", error)
    }

}



