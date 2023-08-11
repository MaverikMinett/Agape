import { Field, Model, Primary } from '@agape/model';
import { MongoConnection } from '../lib/connections/mongo.connection';
import { MongoDatabase } from '../lib/databases/mongo.database';
import { Orm } from '../lib/orm'

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'foo'


describe('Nested Views', () => {
    const connection = new MongoConnection(DATABASE_URL);
    const database = new MongoDatabase(connection, DATABASE_NAME)

    let orm = new Orm()

    beforeEach( async () => {
        await connection.connect()
        orm = new Orm()
        orm.registerDatabase('default', database)
    })

    it('should insert the foo', async() => {
        @Model class Foo {

            @Primary id: string
            @Field name: string
            @Field age: number
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                Object.assign( this, params )
            }
        }

        const foo = new Foo({ name: "Johnny", age: 42 })
        orm.registerModel(Foo)

        try {
            const id = await orm.insert(Foo, foo).exec()
            expect(id).toBeTruthy()
        }
        catch (error) {
            console.log(error)
        }
    })

    it('should set the id on the foo', async() => {
        @Model class Foo {

            @Primary id: string
            @Field name: string
            @Field age: number
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                Object.assign( this, params )
            }
        }

        const foo = new Foo({ name: "Johnny", age: 42 })
        orm.registerModel(Foo)


        const id = await orm.insert(Foo, foo).exec()
        expect(foo.id).toBeTruthy()
        console.log(foo.id)

    })

    it('should store the id of the bar', async() => {
        @Model class Foo {

            @Primary id: string
            @Field name: string
            @Field age: number
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                Object.assign( this, params )
            }
        }

        const foo = new Foo({ name: "Johnny", age: 42 })
        orm.registerModel(Foo)


        const id = await orm.insert(Foo, foo).exec()
        expect(foo.id).toBeTruthy()
        console.log(foo.id)

    })

})