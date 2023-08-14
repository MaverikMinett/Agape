import { Document, Field, Model, Primary, View } from '@agape/model';
import { MongoConnection } from './connections/mongo.connection';
import { MongoDatabase } from './databases/mongo.database';
import { Orm } from './orm'

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
        orm.debug = true
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
    
            orm.registerModel(Foo)
            orm.registerModel(Bar)
    
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
    
            orm.registerModel(Foo)
            orm.registerModel(Bar)
    
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
            
                    orm.registerModel(Foo)
            
                    const foo1 = new Foo({ name: "Johnny", age: 42 })
                    const foo2 = new Foo({ name: "James", age: 42 })
                    await orm.insert(Foo, foo1).exec()
                    await orm.insert(Foo, foo2).exec()
        
                    const results = await orm.list(Foo, { name: foo1.name }).exec()
                    expect(results.length).toBe(1)
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)

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
            
                    orm.registerModel(Foo)

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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
                    const foo1 = new Foo({ name: "Johnny", age: 42 })
                    const foo2 = new Foo({ name: "James", age: 42 })
                    await orm.insert(Foo, foo1).exec()
                    await orm.insert(Foo, foo2).exec()
        
                    const results = await orm.list(Foo, { id__in: [foo1.id, foo2.id] }).exec()
                    expect(results.length).toBe(2)
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
            
                    orm.registerModel(Foo)
            
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
    })

    
})

    

