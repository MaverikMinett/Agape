import { Document, Field, Model, Primary, View, ForeignKey } from '@agape/model';
import { MongoConnection } from './connections/mongo.connection';
import { MongoDatabase } from './databases/mongo.database';
import { Orm } from './orm'

const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'foo'


describe('Orm', () => {

    let orm = new Orm()
    let connection = new MongoConnection(DATABASE_URL);
    let database = new MongoDatabase(connection, DATABASE_NAME)
    beforeEach( async () => {
        connection = new MongoConnection(DATABASE_URL);

        await connection.connect()
        database = new MongoDatabase(connection, DATABASE_NAME)

        orm = new Orm()
        orm.debug = true
        orm.registerDatabase('default', database)
    })

    afterEach( async () => {
        const foos = database.getCollection('foos')
        await foos.deleteMany({})

        const bars = database.getCollection('bars')
        await bars.deleteMany({})

        const users = database.getCollection('users')
        await users.deleteMany({})

        await connection.disconnect()
    })

    describe('registerDocument', () => {
        it('should register a document', async () => {
            @Model class Foo extends Document {
        
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }

            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)

            try {
                const id = await orm.insert(Foo, foo).exec()
                expect(id).toBeTruthy()
            }
            catch (error) {
                console.log(error)
            }
    })  
    })

    describe('InsertQuery', () => {
        it('should insert the foo', async() => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)

            const { id } = await orm.insert(Foo, foo).exec()
            expect(id).toBeTruthy()
        })
    
        it('should set the id on the foo', async() => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)
    
    
            await orm.insert(Foo, foo).exec()
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
    
            orm.registerDocument(Foo)
            orm.registerDocument(Bar)
    
            const bar = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
            const foo = new Foo({ name: "Johnny", age: 42, bar: bar })
            
            await orm.insert(Bar, bar).exec()
            expect( bar.id ).toBeTruthy()
            
            await orm.insert(Foo, foo).exec()
            expect( foo.id ).toBeTruthy()
        })
    })

    describe('UpdateQuery', () => {
        it('should update the foo using the record id', async() => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)

            const { id } = await orm.insert(Foo, foo).exec()
            
            foo.age = 55
            await orm.update(Foo, id, foo).exec()
        })
        it('should update the foo using a filter', async() => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)

            const { id } = await orm.insert(Foo, foo).exec()
            
            foo.age = 55
            await orm.update(Foo, { age: 42 }, foo).exec()

            const retrievedFoo = await orm.retrieve(Foo, id).exec()
            expect(retrievedFoo.age).toBe(55)
        })
    })

    describe('RetrieveQuery', () => {
        describe('nested documents', () => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
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
            it('should allow bar to be undefined', async () => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        

                const foo = new Foo({ name: "Johnny", age: 42 })
                

                await orm.insert(Foo, foo).exec()
        
                const retrievedFoo = await orm.retrieve(Foo, foo.id).exec()
                expect(retrievedFoo.bar).toBe(null)
            })
            it('should allow bar to be null', async () => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        

                const foo = new Foo({ name: "Johnny", age: 42, bar: null })
                

                await orm.insert(Foo, foo).exec()
        
                const retrievedFoo = await orm.retrieve(Foo, foo.id).exec()
                expect(retrievedFoo.bar).toBe(null)
            })
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
    
            orm.registerDocument(Foo)
    
            const foo1 = new Foo({ name: "Johnny", age: 42 })
            const foo2 = new Foo({ name: "James", age: 42 })
            orm.insert(Foo, foo1).exec()
            orm.insert(Foo, foo2).exec()

            const results = await orm.list(Foo).exec()
            expect(results.length).toBe(2)
        })
        
        describe('nested documents', () => {
            it('should retrieve the bar documents with the foo documents', async() => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
                const bar1 = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
                const foo1 = new Foo({ name: "Johnny", age: 42, bar: bar1 })
                await orm.insert(Bar, bar1).exec()
                await orm.insert(Foo, foo1).exec()
    
                const foo2 = new Foo({ name: "James", age: 42, bar: bar1 })
                await orm.insert(Foo, foo2).exec()
    
                const results = await orm.list(Foo).exec()
                expect(results.length).toBe(2)
                expect(results[0].bar).toBeTruthy()
                expect(results[0].bar.id).toBe(bar1.id)
                expect(results[1].bar).toBeTruthy()
                expect(results[1].bar.id).toBe(bar1.id)
            })
    
            it('should retrieve the same bar document for each foo document', async() => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
                const bar1 = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
                const foo1 = new Foo({ name: "Johnny", age: 42, bar: bar1 })
                await orm.insert(Bar, bar1).exec()
                await orm.insert(Foo, foo1).exec()
    
                const foo2 = new Foo({ name: "James", age: 42, bar: bar1 })
                await orm.insert(Foo, foo2).exec()
    
                const results = await orm.list(Foo).exec()
                expect(results.length).toBe(2)
                expect(results[0].bar).toBe(results[1].bar)
            })

            it('should allow bar to be undefined', async () => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
                const foo1 = new Foo({ name: "Johnny", age: 42 })

                await orm.insert(Foo, foo1).exec()
    
                const foo2 = new Foo({ name: "James", age: 42 })
                await orm.insert(Foo, foo2).exec()
    
                const results = await orm.list(Foo).exec()
                expect(results.length).toBe(2)
                expect(results[0].bar).toBe(null)
            })
            it('should allow bar to be null', async () => {
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
        
                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
        
                const foo1 = new Foo({ name: "Johnny", bar: null })

                await orm.insert(Foo, foo1).exec()
    
                const foo2 = new Foo({ name: "James", bar: null })
                await orm.insert(Foo, foo2).exec()
    
                const results = await orm.list(Foo).exec()
                expect(results.length).toBe(2)
                expect(results[0].bar).toBe(null)
            })
        })
        describe('Filter operators', () => {
            describe('String', () => {
                describe('equality', () => {
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
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { name: foo1.name }).exec()
                        expect(results.length).toBe(1)
                    })
                    it('should match on a regex', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { name: /j/i }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('in', () => {
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
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { name__in: [foo1.name, foo2.name] }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('search', () => {
                    it('should perform a case sensitive search', async() => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ name: "Johnny", age: 42})
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56} )
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { name__search: 'J' }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('searchi', () => {
                    it('should perform a case insensitive search', async() => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ name: "Johnny", age: 42})
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56} )
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { name__searchi: 'j' }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('greater/less than', () => {
                    it('should filter strings greater than', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__gt: 'A' }).exec()
                        expect(results.length).toBe(2)
                    })
                    it('should filter strings greater than or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__gte: 'A' }).exec()
                        expect(results.length).toBe(3)
                    })
                    it('should filter strings less than', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__lt: 'C' }).exec()
                        expect(results.length).toBe(2)
                    })
                    it('should filter strings less than or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__lte: 'C' }).exec()
                        expect(results.length).toBe(3)
                    })
                    it('should filter strings between', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__gt: 'A', letter__lt: 'C' }).exec()
                        expect(results.length).toBe(1)
                    })
                    it('should filter strings between or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field letter: string
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
    
                        const foo1 = new Foo({ letter: 'A' })
                        const foo2 = new Foo({ letter: 'B' })
                        const foo3 = new Foo({ letter: 'C' })
    
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
                
                        const results = await orm.list(Foo, { letter__gte: 'A', letter__lte: 'C' }).exec()
                        expect(results.length).toBe(3)
                    })
                })
               
            })
            describe('Primary Key', () => {
                describe('equality', () => {
                    it('should filter the records by id', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { id: foo1.id }).exec()
                        expect(results.length).toBe(1)
                    })
                })
                describe('in', () => {
                    it('should filter the records by multiple ids', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { id__in: [foo1.id, foo2.id] }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('search',  () => {
                    it('should throw an error', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = 
                        await expect( async () => {
                            await orm.list(Foo, { id__search: '' }).exec()
                        })
                        .rejects
                        .toThrow('Cannot search on primary key');
                    })
                })
                describe('searchi', () => {
                    it('should throw an error', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = 
                        await expect( async () => {
                            await orm.list(Foo, { id__searchi: '' }).exec()
                        })
                        .rejects
                        .toThrow('Cannot search on primary key');
                    })
                })
            })
            describe('Number', () => {
                describe('eqality', () => {
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
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 42 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, { age: foo1.age }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('in', () => {
                    it('should filter the records on multiple ages', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__in: [foo1.age, foo2.age] }).exec()
                        expect(results.length).toBe(2)
                    })
                })
                describe('greater/less than', () => {
                    it('should filter numbers greater than', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__gt: foo1.age }).exec()
                        expect(results.length).toBe(2)
                    })
                    it('should filter numbers greater than or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__gte: foo1.age }).exec()
                        expect(results.length).toBe(3)
                    })
                    it('should filter numbers less than', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__lt: foo3.age }).exec()
                        expect(results.length).toBe(2)
                    })
                    it('should filter numbers less than or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__lte: foo3.age }).exec()
                        expect(results.length).toBe(3)
                    })
                    it('should filter numbers between', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__gt: foo1.age, age__lt: foo3.age }).exec()
                        expect(results.length).toBe(1)
                    })
                    it('should filter numbers between or equal to', async () => {
                        @Model class Foo extends Document {
                
                            @Primary id: string
                            @Field name: string
                            @Field age: number
                        
                            constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                                super()
                                Object.assign( this, params )
                            }
                        }
                
                        orm.registerDocument(Foo)
                
                        const foo1 = new Foo({ name: "Johnny", age: 36 })
                        const foo2 = new Foo({ name: "James", age: 42 })
                        const foo3 = new Foo({ name: "Mary", age: 56 })
                        await orm.insert(Foo, foo1).exec()
                        await orm.insert(Foo, foo2).exec()
                        await orm.insert(Foo, foo3).exec()
            
                        const results = await orm.list(Foo, { age__gte: foo1.age, age__lte: foo3.age }).exec()
                        expect(results.length).toBe(3)
                    })
                })
            })
            describe('Document', () => {
                describe('equality', () => {
                    it('should select the foo document by selecting on the bar id', async() => {
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
                
                        orm.registerDocument(Foo)
                        orm.registerDocument(Bar)
                
                        const bar1 = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
                        const foo1 = new Foo({ name: "Johnny", age: 42, bar: bar1 })
                        await orm.insert(Bar, bar1).exec()
                        await orm.insert(Foo, foo1).exec()
            
                        const bar2 = new Bar({ name: "The Five and Dime", address: "123 Main St"})
                        const foo2 = new Foo({ name: "James", age: 42, bar: bar2 })
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, {bar: bar1.id}).exec()
                        expect(results.length).toBe(1)
                        expect(results[0].bar).toBeTruthy()
                        expect(results[0].bar.id).toBe(bar1.id)
                    })
                    it('should select the foo document by selecting on the bar object', async() => {
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
                
                        orm.registerDocument(Foo)
                        orm.registerDocument(Bar)
                
                        const bar1 = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
                        const foo1 = new Foo({ name: "Johnny", age: 42, bar: bar1 })
                        await orm.insert(Bar, bar1).exec()
                        await orm.insert(Foo, foo1).exec()
            
                        const bar2 = new Bar({ name: "The Five and Dime", address: "123 Main St"})
                        const foo2 = new Foo({ name: "James", age: 42, bar: bar2 })
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, {bar: bar1}).exec()
                        expect(results.length).toBe(1)
                        expect(results[0].bar).toBeTruthy()
                        expect(results[0].bar.id).toBe(bar1.id)
                    })
                })
                describe('in', () => {
                    it('should select the foo document by selecting on the bar id', async() => {
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
                
                        orm.registerDocument(Foo)
                        orm.registerDocument(Bar)
                
                        const bar1 = new Bar({ name: "The Last Drop", address: "16 Fantasy Lane"})
                        const foo1 = new Foo({ name: "Johnny", age: 42, bar: bar1 })
                        await orm.insert(Bar, bar1).exec()
                        await orm.insert(Foo, foo1).exec()
            
                        const bar2 = new Bar({ name: "The Five and Dime", address: "123 Main St"})
                        const foo2 = new Foo({ name: "James", age: 42, bar: bar2 })
                        await orm.insert(Foo, foo2).exec()
    
                        const bar3 = new Bar({ name: "The Five and Dime", address: "123 Main St"})
                        const foo3 = new Foo({ name: "James", age: 42, bar: bar2 })
                        await orm.insert(Foo, foo2).exec()
            
                        const results = await orm.list(Foo, {bar: bar1.id}).exec()
                        expect(results.length).toBe(1)
                        expect(results[0].bar).toBeTruthy()
                        expect(results[0].bar.id).toBe(bar1.id)
                    })
                })
            })
        })
    })

    describe('LookupQuery', () => {
        it('should find the user by username', async () => {
            @Model class User extends Document {
                @Primary id: string;
                @Field username: string;

                constructor( params?: Partial<Pick<User, keyof User>> ) {
                    super()
                    Object.assign(this, params)
                }
            }

            orm.registerDocument(User)

            const user = new User({ username: "foo" })
            await orm.insert(User, user).exec()
            expect(user.id).toBeDefined()

            const retrievedUser = await orm.lookup(User, { username: "foo" }).exec()
            expect(retrievedUser).toBeDefined()
        })
        describe('nested documents', () => {
            it('should have an undefined role', async () => {
                @Model class Role extends Document {
                    @Primary id: string;
                    @Field name: string;
    
                    constructor( params?: Partial<Pick<Role, keyof Role>> ) {
                        super()
                        Object.assign(this, params)
                    }
                }
                @Model class User extends Document {
                    @Primary id: string;
                    @Field username: string;
                    @Field role: Role;
    
                    constructor( params?: Partial<Pick<User, keyof User>> ) {
                        super()
                        Object.assign(this, params)
                    }
                }
    
                orm.registerDocument(User)
                orm.registerDocument(Role)
    
                const role = new Role({ name: 'registered' })
                await orm.insert(Role, role).exec()
                await orm.insert(User, new User({ username: "foo" })).exec()
    
                const user = await orm.lookup(User, { username: "foo" }).exec()
                expect(user).toBeDefined()
            })
            it('should lookup the user', async () => {
                @Model class Role extends Document {
                    @Primary id: string;
                    @Field name: string;
    
                    constructor( params?: Partial<Pick<Role, keyof Role>> ) {
                        super()
                        Object.assign(this, params)
                    }
                }
                @Model class User extends Document {
                    @Primary id: string;
                    @Field username: string;
                    @Field role: Role;
    
                    constructor( params?: Partial<Pick<User, keyof User>> ) {
                        super()
                        Object.assign(this, params)
                    }
                }
    
                orm.registerDocument(User)
                orm.registerDocument(Role)
    
                const role = new Role({ name: 'registered' })
                await orm.insert(Role, role).exec()
                await orm.insert(User, new User({ username: "foo", role })).exec()
    
                const user = await orm.lookup(User, { username: "foo" }).exec()
                expect(user.role).toBeDefined()
            }) 
        })
    })

    describe('DeleteQuery', () => {
        it('should delete the foo', async() => {
            @Model class Foo extends Document {
    
                @Primary id: string
                @Field name: string
                @Field age: number
            
                constructor( params?: Partial<Pick<Foo, keyof Foo>>) {
                    super()
                    Object.assign( this, params )
                }
            }
    
            const foo = new Foo({ name: "Johnny", age: 42 })
            orm.registerDocument(Foo)

            const { id } = await orm.insert(Foo, foo).exec()
            
            await orm.delete(Foo, id).exec()
        })
    })

    describe('ForeignKey fields', () => {
        describe('Insert Query', () => {

            it('should retrieve the bar object', async () => {
                @Model class Bar extends Document{
                    @Primary id: string
                    @Field name: string
                }
                
                @Model class Foo extends Document {
                    @Primary id: string
                    @Field bar: Bar;
                }
    
                interface FooCreateView extends Omit<Foo, 'bar'> { }
    
                @View(Foo, {
                    omit: ['bar']
                }) class FooCreateView extends Document {
                    @ForeignKey bar: string
                }

                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
    
                const bar = new Bar();
                bar.name = 'Baz'
                await orm.insert(Bar, bar).exec()
    
                const foo = new FooCreateView();
                foo.bar = bar.id
                await orm.insert(FooCreateView, foo).exec()
    
                const retrievedFoo = await orm.retrieve(Foo, foo.id).exec()
                expect(retrievedFoo.bar.name).toEqual(bar.name)
            })
            
        })
        describe('Retrieve Query', () => {
            it('should retrieve the bar id', async () => {
                @Model class Bar extends Document{
                    @Primary id: string
                    @Field name: string
                }
                
                @Model class Foo extends Document {
                    @Primary id: string
                    @Field bar: Bar;
                }
    
                interface FooCreateView extends Omit<Foo, 'bar'> { }
    
                @View(Foo, {
                    omit: ['bar']
                }) class FooCreateView extends Document {
                    @ForeignKey bar: string
                }


                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
    
                const bar = new Bar();
                bar.name = 'Baz'
                await orm.insert(Bar, bar).exec()
    
                const foo = new FooCreateView();
                foo.bar = bar.id
                await orm.insert(FooCreateView, foo).exec()
    
                const retrievedFoo = await orm.retrieve(FooCreateView, foo.id).exec()
                expect(retrievedFoo.bar).toBe(bar.id)
            })
        })
        // describe('Update Query', () => {

        // })

        describe('Lookup Query', () => {
            it('should retrieve the bar id', async () => {
                @Model class Bar extends Document{
                    @Primary id: string
                    @Field name: string
                }
                
                @Model class Foo extends Document {
                    @Primary id: string
                    @Field bar: Bar;
                }
    
                interface FooCreateView extends Omit<Foo, 'bar'> { }
    
                @View(Foo, {
                    omit: ['bar']
                }) class FooCreateView extends Document {
                    @ForeignKey bar: string
                }


                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
    
                const bar = new Bar();
                bar.name = 'Baz'
                await orm.insert(Bar, bar).exec()
    
                const foo = new FooCreateView();
                foo.bar = bar.id
                await orm.insert(FooCreateView, foo).exec()
    
                const retrievedFoo = await orm.lookup(FooCreateView, { bar: bar.id } ).exec()
                expect(retrievedFoo.bar).toBe(bar.id)
            })
        })

        describe('List Query', () => {
            it('should retrieve the bar id', async () => {
                @Model class Bar extends Document{
                    @Primary id: string
                    @Field name: string
                }
                
                @Model class Foo extends Document {
                    @Primary id: string
                    @Field bar: Bar;
                }
    
                interface FooCreateView extends Omit<Foo, 'bar'> { }
    
                @View(Foo, {
                    omit: ['bar']
                }) class FooCreateView extends Document {
                    @ForeignKey bar: string
                }


                orm.registerDocument(Foo)
                orm.registerDocument(Bar)
    
                const bar = new Bar();
                bar.name = 'Baz'
                await orm.insert(Bar, bar).exec()
    
                const foo1 = new FooCreateView();
                foo1.bar = bar.id
                await orm.insert(FooCreateView, foo1).exec()

                const foo2 = new FooCreateView();
                foo2.bar = bar.id
                await orm.insert(FooCreateView, foo2).exec()
    
                const retrievedFoos = await orm.list(FooCreateView, { bar: bar.id } ).exec()
                expect(retrievedFoos[0].bar).toBe(bar.id)
                expect(retrievedFoos[1].bar).toBe(bar.id)
            })
        })
    })
    
})

    

