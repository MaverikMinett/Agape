import { Document, Field, Model, Primary, View } from '@agape/model';
import { MongoConnection } from '../lib/connections/mongo.connection';
import { MongoDatabase } from '../lib/databases/mongo.database';
import { Orm } from '../lib/orm'

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'foo'


describe('Nested Views', () => {
    
    

    let orm = new Orm()
    let connection = new MongoConnection(DATABASE_URL);
    let database = new MongoDatabase(connection, DATABASE_NAME)
    beforeEach( async () => {
        connection = new MongoConnection(DATABASE_URL);

        await connection.connect()
        database = new MongoDatabase(connection, DATABASE_NAME)

        orm = new Orm()
        orm.registerDatabase('default', database)
    })


    afterEach( async () => {
        const foos = database.getCollection('foos')
        await foos.deleteMany({})

        const bars = database.getCollection('bars')
        await bars.deleteMany({})

        await connection.disconnect()
    })

    describe('describe InsertQuery', () => {
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
    })

    describe('RetrieveQuery', () => {
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

    describe('ListQuery', () => {
        it('should list the records', async () => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            orm.registerModel(Foo)
    
            const foo1 = new Foo({ name: "Johnny", age: 42 })
            const foo2 = new Foo({ name: "James", age: 42 })
            orm.insert(Foo, foo1).exec()
            orm.insert(Foo, foo2).exec()

            const results = await orm.list(Foo).exec()
            expect(results.length).toBe(2)
        })

        it('should filter the records on the name', async () => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            orm.registerModel(Foo)
    
            const foo1 = new Foo({ name: "Johnny", age: 42 })
            const foo2 = new Foo({ name: "James", age: 42 })
            orm.insert(Foo, foo1).exec()
            orm.insert(Foo, foo2).exec()

            const results = await orm.list(Foo, { name: foo1.name }).exec()
            expect(results.length).toBe(1)
        })

        it('should filter the records on the age', async () => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            orm.registerModel(Foo)
    
            const foo1 = new Foo({ name: "Johnny", age: 42 })
            const foo2 = new Foo({ name: "James", age: 42 })
            orm.insert(Foo, foo1).exec()
            orm.insert(Foo, foo2).exec()

            const results = await orm.list(Foo, { age: foo1.age }).exec()
            expect(results.length).toBe(2)
        })

        it('should filter the records on multiple names', async () => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            orm.registerModel(Foo)
    
            const foo1 = new Foo({ name: "Johnny", age: 42 })
            const foo2 = new Foo({ name: "James", age: 42 })
            orm.insert(Foo, foo1).exec()
            orm.insert(Foo, foo2).exec()

            const results = await orm.list(Foo, { name__in: [foo1.name, foo2.name] }).exec()
            expect(results.length).toBe(2)
        })
    })

    

})