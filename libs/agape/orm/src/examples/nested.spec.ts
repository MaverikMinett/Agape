import { Document, Field, Model, Primary, View } from '@agape/model';
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

    it('should store the id of the bar document', async() => {
        @Model class Bar extends Document {

            @Primary id: string
            @Field name: string
            @Field address: string
        
            constructor( params?: Partial<Pick<Bar, keyof Bar>>) {
                super()
                Object.assign( this, params )
            }
        }

        @Model class Foo extends Document {

            @Primary id: string
            @Field name: string
            @Field age: number
            @Field bar: Bar
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                super()
                Object.assign( this, params )
            }
        }

        orm.registerModel(Foo)
        orm.registerModel(Bar)

        const bar = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
        const foo = new Foo({ name: "Johnny", age: 42, bar: bar })
        
        await orm.insert(Bar, bar).exec()
        expect( bar.id ).toBeTruthy()
        
        await orm.insert(Foo, foo).exec()
        expect( foo.id ).toBeTruthy()
    })

    it('should retrieve the bar document with the foo document', async() => {
        @Model class Bar extends Document {

            @Primary id: string
            @Field name: string
            @Field address: string
        
            constructor( params?: Partial<Pick<Bar, keyof Bar>>) {
                super()
                Object.assign( this, params )
            }
        }

        @Model class Foo extends Document {

            @Primary id: string
            @Field name: string
            @Field age: number
            @Field bar: Bar
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                super()
                Object.assign( this, params )
            }
        }

        orm.registerModel(Foo)
        orm.registerModel(Bar)

        const bar = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
        const foo = new Foo({ name: "Johnny", age: 42, bar: bar })
        
        await orm.insert(Bar, bar).exec()
        await orm.insert(Foo, foo).exec()

        const retrievedFoo = await orm.retrieve(Foo, foo.id).exec()
        expect(retrievedFoo.bar).toBeTruthy()
        expect(retrievedFoo.bar.id).toBe(bar.id)
        expect(retrievedFoo.bar.name).toBe(bar.name)
        expect(retrievedFoo.bar.address).toBe(bar.address)
    })

    it('should retrieve the bar name view with the foo document', async() => {
        @Model class Bar extends Document {

            @Primary id: string
            @Field name: string
            @Field address: string
        
            constructor( params?: Partial<Pick<Bar, keyof Bar>>) {
                super()
                Object.assign( this, params )
            }
        }

        interface BarName extends Pick<Bar, 'id'|'name'> { }
        @View(Bar, ['id', 'name'] ) 
        class BarName extends Document { }

        @Model class Foo extends Document {

            @Primary id: string
            @Field name: string
            @Field age: number
            @Field bar: BarName
        
            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                super()
                Object.assign( this, params )
            }
        }

        orm.registerModel(Foo)
        orm.registerModel(Bar)

        const bar = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
        const foo = new Foo({ name: "Johnny", age: 42, bar: bar })
        
        await orm.insert(Bar, bar).exec()
        await orm.insert(Foo, foo).exec()

        const retrievedFoo = await orm.retrieve(Foo, foo.id).exec()
        expect(retrievedFoo.bar).toBeTruthy()
        expect(retrievedFoo.bar.id).toBe(bar.id)
        expect(retrievedFoo.bar.name).toBe(bar.name)
        expect((retrievedFoo.bar as any).address).toBe(undefined)
    })

})