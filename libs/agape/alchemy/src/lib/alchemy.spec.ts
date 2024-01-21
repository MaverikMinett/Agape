import { Field, Model, Optional, Required } from '@agape/model'
import { Alchemy } from './alchemy'

describe('Alchemy', () => {

    let a: Alchemy

    beforeEach( () => {
        a = new Alchemy()
    })

    describe('deserialize', () => {
        describe('primitives', () => {
            describe('boolean', () => {
                it('should be valid', () => {
                    const json = true
                    const { valid, error, value } = a.deserialize(Boolean, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(true)
                })
                it('should be invalid if the wrong type', () => {
                    const json = 'foo'
                    const { valid, error, value } = a.deserialize(Boolean, json)
                    expect(valid).toBe(false)
                    expect(error).toBe(`Invalid data type: expected a boolean, received ${typeof json}`)
                    expect(value).toBe(undefined)
                })
                it('should be valid if null', () => {
                    const json = null
                    const { valid, error, value } = a.deserialize(Boolean, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(null)
                })
                it('should be valid if undefined', () => {
                    const json = undefined
                    const { valid, error, value } = a.deserialize(Boolean, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(undefined)
                })
            })
            describe('string', () => {
                it('should be valid', () => {
                    const json = 'foo'
                    const { valid, error, value } = a.deserialize(String, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe('foo')
                })
                it('should be invalid if the wrong type', () => {
                    const json = 42
                    const { valid, error, value } = a.deserialize(String, json)
                    expect(valid).toBe(false)
                    expect(error).toBe(`Invalid data type: expected a string, received ${typeof json}`)
                    expect(value).toBe(undefined)
                })
                it('should be valid if null', () => {
                    const json = null
                    const { valid, error, value } = a.deserialize(String, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(null)
                })
                it('should be valid if undefined', () => {
                    const json = undefined
                    const { valid, error, value } = a.deserialize(String, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(undefined)
                })
            })
            describe('number', () => {
                it('should be valid', () => {
                    const json = 42
                    const { valid, error, value } = a.deserialize(Number, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(42)
                })
                it('should be invalid if the wrong type', () => {
                    const json = 'foo'
                    const { valid, error, value } = a.deserialize(Number, json)
                    expect(valid).toBe(false)
                    expect(error).toBe(`Invalid data type: expected a number, received ${typeof json}`)
                    expect(value).toBe(undefined)
                })
                it('should be valid if null', () => {
                    const json = null
                    const { valid, error, value } = a.deserialize(Number, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(null)
                })
                it('should be valid if undefined', () => {
                    const json = undefined
                    const { valid, error, value } = a.deserialize(Number, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBe(undefined)
                })
            })
        })
        describe('date', () => {
            it('should be valid from iso string', () => {
                const date = new Date()
                const json = date.toISOString()
                console.log(json)
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toEqual(date)
            })
            it('should be valid', () => {
                const json = '2024-02-29T00:00:000Z'
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(false)
                expect(error).toBe(`Invalid date`)
                expect(value).toEqual(undefined)
            })
            it('should be invalid format', () => {
                const json = '2023/02/28'
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(false)
                expect(error).toBe(`Invalid date`)
                expect(value).toEqual(undefined)
            })
            it('should be invalid date', () => {
                const json = '2023-02-29T00:00:000Z'
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(false)
                expect(error).toBe(`Invalid date`)
                expect(value).toEqual(undefined)
            })
            it('should be valid if null', () => {
                const json = null
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(null)
            })
            it('should be valid if undefined', () => {
                const json = undefined
                const { valid, error, value } = a.deserialize(Date, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(undefined)
            })
        })
        describe('model', () => {
            it('should be valid', () => {
                @Model class Foo {
                    @Field numberField: number

                    @Field stringField: string

                    @Field booleanField: boolean

                    @Field dateField: Date
                }

                const json = {
                    numberField: 42,
                    stringField: 'foo',
                    booleanField: true,
                    dateField: '2020-01-01T12:00:00.000Z'
                }

                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBeTruthy()
                expect(value.numberField).toBe(42)
                expect(value.stringField).toBe('foo')
                expect(value.booleanField).toBe(true)
                expect(value.dateField).toEqual( new Date('2020-01-01T12:00:00.000Z') )
            })
            it('should be invalid', () => {
                @Model class Foo {
                    @Field numberField: number

                    @Field stringField: string

                    @Field booleanField: boolean

                    @Field dateField: Date
                }
                
                const json = {
                    numberField: 'foo',
                    stringField: 42,
                    booleanField: 'bar',
                    dateField: 56
                }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(false)
                expect(error).toEqual({
                    numberField: `Invalid data type: expected a number, received string`,
                    stringField: `Invalid data type: expected a string, received number`,
                    booleanField: `Invalid data type: expected a boolean, received string`,
                    dateField: 'Invalid data type: expected a date as an iso string, received number'
                })
                expect(value).toBe(undefined)
            })
            it('should be valid if null', () => {
                @Model class Foo {
                    bar: string
                }
                const json = null
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(null)
            })
            it('should be valid if undefined', () => {
                @Model class Foo {
                    bar: string
                }
                const json = undefined
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(undefined)
            })
            it('should be invalid if has additional properties', () => {
                @Model class Foo {
                    @Field foo: string
                }
                const json = { foo: 'bar', bar: 'baz' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(false)
                expect(error).toEqual({bar: 'Invalid field' })
                expect(value).toBe(undefined)
            })
            it('should be invalid if missing properties', () => {
                @Model class Foo {
                    @Field foo: string
                    @Field bar: string
                }
                const json = { foo: 'bar' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(false)
                expect(error).toEqual({ bar: 'Field is missing' })
                expect(value).toBe(undefined)
            })
            it('should be valid if missing optional properties', () => {
                @Model class Foo {
                    @Field foo: string
                    @Optional @Field bar: string
                }

                const json = { foo: 'bar' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toEqual({foo: 'bar'})
            })
            it('should be invalid if required properties are empty', () => {
                @Model class Foo {
                    @Required @Field stringField: string
                    @Required @Field booleanField: boolean
                    @Required @Field dateField: Date
                }
                const json = {
                    stringField: '',
                    booleanField: null,
                    dateField: undefined
                }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(false)
                expect(error).toEqual({
                    stringField: 'Field is required',
                    booleanField: 'Field is required',
                    dateField: 'Field is required'
                })
                expect(value).toBe(undefined)
            })
            it('should be valid if required properties are not empty', () => {
                @Model class Foo {
                    @Required @Field stringField: string
                    @Required @Field booleanField: boolean
                    @Required @Field dateField: Date
                }
                const date = new Date()
                const json = {
                    stringField: 'foo',
                    booleanField: false,
                    dateField: date.toISOString()
                }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toEqual({
                    stringField: 'foo',
                    booleanField: false,
                    dateField: date
                })
            })
            it('optional and required to work together', () => {
                @Model class Foo {
                    @Required @Field foo: string
                    @Optional @Required @Field bar: string
                }

                {
                    const json = {
                        foo: 'foo',
                        bar: 'bar'
                    }
                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toEqual({
                        foo: 'foo',
                        bar: 'bar',
                    })
                }

                {
                    const json = {
                        foo: 'foo'
                    }
                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toEqual({
                        foo: 'foo',
                    })
                }

                {
                    const json = {
                        foo: 'foo',
                        bar: ''
                    }
                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(false)
                    expect(error).toEqual({
                        bar: 'Field is required'
                    })
                    expect(value).toBe(undefined)
                }

            })
            describe('nested models', () => {
                it('should be valid', () =>{
                    @Model class Bar {
                        @Field numberField: number
    
                        @Field stringField: string
    
                        @Field booleanField: boolean
    
                        @Field dateField: Date
                    }

                    @Model class Foo {
                        @Field bar: Bar
                    }

                    const json = {
                        bar: {
                            numberField: 42,
                            stringField: 'foo',
                            booleanField: true,
                            dateField: '2020-01-01T12:00:00.000Z'
                        }
                    }

                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toBeTruthy()
                    expect(value.bar.numberField).toBe(42)
                    expect(value.bar.stringField).toBe('foo')
                    expect(value.bar.booleanField).toBe(true)
                    expect(value.bar.dateField).toEqual( new Date('2020-01-01T12:00:00.000Z') )

                })
                it('should be invalid type', () => {
                    @Model class Bar {
                        @Field numberField: number
    
                        @Field stringField: string
    
                        @Field booleanField: boolean
    
                        @Field dateField: Date
                    }

                    @Model class Foo {
                        @Field bar: Bar
                    }

                    const json = {
                        bar: 42
                    }

                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(false)
                    expect(error).toEqual({ bar: `Invalid data type: expected an object, received number` })
                    expect(value).toBe(undefined)
                })
                it('should be invalid child object', () => {
                    @Model class Bar {
                        @Field numberField: number
    
                        @Field stringField: string
    
                        @Field booleanField: boolean
    
                        @Field dateField: Date
                    }

                    @Model class Foo {
                        @Field bar: Bar
                    }

                    const json = {
                        bar: {
                            numberField: 'foo',
                            stringField: 42,
                            booleanField: 'bar',
                            dateField: 56
                        }
                    }

                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(false)
                    expect(error).toEqual({ 
                        bar: {
                            numberField: `Invalid data type: expected a number, received string`,
                            stringField: `Invalid data type: expected a string, received number`,
                            booleanField: `Invalid data type: expected a boolean, received string`,
                            dateField: 'Invalid data type: expected a date as an iso string, received number'
                        }
                    })
                    expect(value).toBe(undefined)
                })
            })
            
        })
        describe('array', () => {
            it('should be valid', () => {
                const json = ['foo','bar','baz']
                const { valid, error, value } = a.deserialize([String], json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toEqual(['foo','bar','baz'])
            })
            it('should be invalid', () => {
                const json = [24,'bar',true]
                const { valid, error, value } = a.deserialize([String], json)
                expect(valid).toBe(false)
                expect(error).toEqual([
                    `Invalid data type: expected a string, received number`,
                    undefined,
                    `Invalid data type: expected a string, received boolean`
                ])
                expect(value).toBe(undefined)
            })
            describe('array of models', () => {
                it('should be valid', () => {
                    @Model class Foo {
                        @Field foo: number
                        @Field bar: string
                    }
                    const json = [
                        { foo: 42, bar: 'baz' },
                        { foo: 56, bar: 'biz' },
                        { foo: 99, bar: 'buz' }
                    ]
                    const { valid, error, value } = a.deserialize([Foo], json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toEqual([
                        { foo: 42, bar: 'baz' },
                        { foo: 56, bar: 'biz' },
                        { foo: 99, bar: 'buz' }
                    ])
                })
                it('should be invalid', () => {
                    @Model class Foo {
                        @Field foo: number
                        @Field bar: string
                    }
                    const json = [
                        { foo: 'baz', bar: 42 },
                        { foo: 56, bar: 'biz' },
                        { foo: true, bar: false }
                    ]
                    const { valid, error, value } = a.deserialize([Foo], json)
                    expect(valid).toBe(false)
                    console.log( valid, error, value)
                    expect(error).toEqual([
                        { 
                            foo: 'Invalid data type: expected a number, received string',
                            bar: 'Invalid data type: expected a string, received number',
                        },
                        undefined,
                        {
                            foo: 'Invalid data type: expected a number, received boolean',
                            bar: 'Invalid data type: expected a string, received boolean',
                        }
                    ])
                    expect(value).toBe(undefined)
                })
            })
            describe('model with array', () => {
                it('should be valid', () => {
                    @Model class Bar {
                        @Field baz: string
                    }
                    @Model class Foo {
                        @Field([Bar]) bars: Bar[]
                    }
                    const json = {
                        bars: [
                            { baz: 'biz' },
                            { baz: 'buz' }
                        ]
                    }
                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(true)
                    expect(error).toBe(undefined)
                    expect(value).toEqual({
                        bars: [
                            { baz: 'biz' },
                            { baz: 'buz' }
                        ]
                    })
                })
                it('should be invalid', () => {
                    @Model class Bar {
                        @Field baz: string
                    }
                    @Model class Foo {
                        @Field([Bar]) bars: Bar[]
                    }
                    const json = {
                        bars: [
                            { baz: 42 },
                            { baz: true }
                        ]
                    }
                    const { valid, error, value } = a.deserialize(Foo, json)
                    expect(valid).toBe(false)
                    expect(error).toEqual({
                        bars: [
                            { baz: `Invalid data type: expected a string, received number` },
                            { baz: `Invalid data type: expected a string, received boolean` }
                        ]
                    })
                    expect(value).toBe(undefined)
                })
            })
            it('should be valid if null', () => {
                const json = null
                const { valid, error, value } = a.deserialize([Boolean], json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(null)
            })
            it('should be valid if undefined', () => {
                const json = undefined
                const { valid, error, value } = a.deserialize([Boolean], json)
                expect(valid).toBe(true)
                expect(error).toBe(undefined)
                expect(value).toBe(undefined)
            })
        })
    })

    describe('serialize', () => {
        describe('primitives', () => {
            describe('boolean', () => {
                it('should serialize true', () => {
                    const value = true
                    const output = a.serialize(Boolean, value)
                    expect(output).toBe(true)
                })
                it('should serialize false', () => {
                    const value = false
                    const output = a.serialize(Boolean, value)
                    expect(output).toBe(false)
                })
                it('should serialize undefined', () => {
                    const value = undefined
                    const output = a.serialize(Boolean, undefined)
                    expect(output).toBe(undefined)
                })
                it('should serialize null', () => {
                    const value = null
                    const output = a.serialize(Boolean, value)
                    expect(output).toBe(null)
                })
            })
            describe('number', () => {
                it('should serialize a number', () => {
                    const value = 42
                    const output = a.serialize(Number, value)
                    expect(output).toBe(42)
                })
                it('should serialize undefined', () => {
                    const value = undefined
                    const output = a.serialize(Number, value)
                    expect(output).toBe(undefined)
                })
                it('should serialize null', () => {
                    const value = null
                    const output = a.serialize(Number, value)
                    expect(output).toBe(null)
                })
            })
            describe('string', () => {
                it('should serialize a string', () => {
                    const value = 'foo'
                    const output = a.serialize(String, value)
                    expect(output).toBe('foo')
                })
                it('should serialize undefined', () => {
                    const value = undefined
                    const output = a.serialize(String, value)
                    expect(output).toBe(undefined)
                })
                it('should serialize null', () => {
                    const value = null
                    const output = a.serialize(String, value)
                    expect(output).toBe(null)
                })
            })
        })
        describe('date', () => {
            it('should serialize a date', () => {
                const value = new Date()
                const output = a.serialize(Date, value)
                expect(output).toBe(value.toISOString())
            })
            it('should serialize undefined', () => {
                const value = undefined
                const output = a.serialize(Date, value)
                expect(output).toBe(undefined)
            })
            it('should serialize null', () => {
                const value = null
                const output = a.serialize(Date, value)
                expect(output).toBe(null)
            })
        })
        describe('array', () => {
            it('should serialize an array of booleans', () => {
                const value = [true, true, false] 
                const output = a.serialize([Boolean], value)
                expect(output).toEqual([true, true, false])
            })
            it('should serialize an array of booleans with undefind and null', () => {
                const value = [true, null, undefined]
                const output = a.serialize([Boolean], value)
                expect(output).toEqual([true, null, undefined])
            })
            it('should serialize null', () => {
                const value = null
                const output = a.serialize([Boolean], value)
                expect(output).toEqual(null)
            })
            it('should serialize undefined', () => {
                const value = undefined
                const output = a.serialize([Boolean], value)
                expect(output).toEqual(undefined)
            })
        })
        describe('model', () => {
            it('should serialize a model', () => {

                interface SomeInterface {
                    foo: string;
                    bar: string;
                }

                @Model class Bar {
                    @Field bar: string
                }

                @Model class Foo {
                    @Field booleanField: boolean
                    @Field numberField: number
                    @Field stringField: string
                    @Field dateField: Date
                    @Field([Bar]) bars: Bar[]
                    @Field interfaceField: SomeInterface
                }

                const value: Foo = {
                    booleanField: true,
                    numberField: 24,
                    stringField: 'foo',
                    dateField: new Date(),
                    bars: [
                        { bar: 'biz' },
                        { bar: 'buz' },
                        { bar: 'baz' }
                    ],
                    interfaceField: { foo: 'string', bar: 'string' }
                }

                const output = a.serialize(Foo, value)
                expect(output === value).toBe(false)
                expect(output.bars !== value.bars)
                expect(output.interfaceField !== value.interfaceField)

                expect(output).toEqual(
                    {
                        booleanField: true,
                        numberField: 24,
                        stringField: 'foo',
                        dateField: value.dateField.toISOString(),
                        bars:[
                            { bar: 'biz' },
                            { bar: 'buz' },
                            { bar: 'baz' }
                        ],
                        interfaceField: { foo: 'string', bar: 'string' }
                    }
                )
            })
            it('should serialize null', () => {
                @Model class Foo {
                    bar: string
                }
                const value = null
                const output = a.serialize(Foo, value)
                expect(output).toEqual(null)
            })
            it('should serialize undefined', () => {
                @Model class Foo {
                    bar: string
                }
                const value = undefined
                const output = a.serialize(Foo, value)
                expect(output).toEqual(undefined)
            })
        })
        describe('object', () => {
            it('should serialize an interface', () => {
                interface Foo {
                    bar: string;
                }
                const value: Foo = { bar: 'baz' }
                const output = a.serialize(Object, value)
                expect(output).toEqual({ bar: 'baz'})
            })
            it('should serialize null', () => {
                interface Foo {
                    bar: string;
                }
                const value: Foo = undefined
                const output = a.serialize(Object, value)
                expect(output).toEqual(undefined)
            })
            it('should serialize undefined', () => {
                interface Foo {
                    bar: string;
                }
                const value: Foo = null
                const output = a.serialize(Object, value)
                expect(output).toEqual(null)
            })
        })
    })

    describe('trim', () => {
        describe('deserializing', () => {
            it('should not trim a string', () => {
                const json = ' foo '
                const { valid, error, value } = a.deserialize(String, json)
                expect(value).toBe(' foo ')
            })
            it('should trim the string if the trim option is passed in', () => {
                const json = ' foo '
                const { valid, error, value } = a.deserialize(String, json, { trim: true })
                expect(value).toBe('foo')
            })
            it('should not trim fields', () => {
                @Model class Foo {
                    @Field foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(value.foo).toBe(' foo ')
            })
            it('should trim fields if the trim option passed to deserialize method', () => {
                @Model class Foo {
                    @Field foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json, { trim: true })
                expect(value.foo).toBe('foo')
            })
            it('should trim fields if the trim option passed to the field descriptor', () => {
                @Model class Foo {
                    @Field({ trim: true }) foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(value.foo).toBe('foo')
            })
            it('should not trim the field if global trim is true and field descriptor trim is false', () => {
                @Model class Foo {
                    @Field({ trim: false }) foo: string
                }
    
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json, { trim: true })
                expect(value.foo).toBe(' foo ')
            })
        })
        describe('serializing', () => {
            it('should not trim a string', () => {
                const json = ' foo '
                const { valid, error, value } = a.deserialize(String, json)
                expect(value).toBe(' foo ')
            })
            it('should trim the string if the trim option is passed in', () => {
                const json = ' foo '
                const { valid, error, value } = a.deserialize(String, json, { trim: true })
                expect(value).toBe('foo')
            })
            it('should not trim fields', () => {
                @Model class Foo {
                    @Field foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(value.foo).toBe(' foo ')
            })
            it('should trim fields if the trim option passed to deserialize method', () => {
                @Model class Foo {
                    @Field foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json, { trim: true })
                expect(value.foo).toBe('foo')
            })
            it('should trim fields if the trim option passed to the field descriptor', () => {
                @Model class Foo {
                    @Field({ trim: true }) foo: string
                }
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json)
                expect(value.foo).toBe('foo')
            })
            it('should not trim the field if global trim is true and field descriptor trim is false', () => {
                @Model class Foo {
                    @Field({ trim: false }) foo: string
                }
    
                const json = { foo: ' foo ' }
                const { valid, error, value } = a.deserialize(Foo, json, { trim: true })
                expect(value.foo).toBe(' foo ')
            })
        })
    })


    // describe('validate json', () => {
    //     describe('raw primitives', () => {
    //         describe('boolean', () => {
    //             it('should validate true', () => {
    //                 const json = true
    //                 const { valid, error } = alchemy.validateJson(Boolean,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should validate false', () => {
    //                 const json = false
    //                 const { valid, error } = alchemy.validateJson(Boolean,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should not validate a string', () => {
    //                 const json = 'false'
    //                 const { valid, error } = alchemy.validateJson(Boolean,json)
    //                 expect(valid).toBe(false)
    //             })
    //             it('should not validate a number', () => {
    //                 const json = 42
    //                 const { valid, error } = alchemy.validateJson(Boolean,json)
    //                 expect(valid).toBe(false)
    //             })
    //         })
    //         describe('number', () => {
    //             it('should validate 0', () => {
    //                 const json = 0
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should validate a positive number', () => {
    //                 const json = 1
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should validate negative number', () => {
    //                 const json = -20
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should not validate true', () => {
    //                 const json = true
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(false)
    //             })
    //             it('should not validate false', () => {
    //                 const json = false
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(false)
    //             })
    //             it('should not validate a string', () => {
    //                 const json = 'false'
    //                 const { valid, error } = alchemy.validateJson(Number,json)
    //                 expect(valid).toBe(false)
    //             })
    //         })
    //         describe('string', () => {
    //             it('should validate an emptry string', () => {
    //                 const json = ''
    //                 const { valid, error } = alchemy.validateJson(String,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should validate a string', () => {
    //                 const json = 'foo'
    //                 const { valid, error } = alchemy.validateJson(String,json)
    //                 expect(valid).toBe(true)
    //             })
    //             it('should not validate a number', () => {
    //                 const json = -20
    //                 const { valid, error } = alchemy.validateJson(String,json)
    //                 expect(valid).toBe(false)
    //             })
    //             it('should not validate true', () => {
    //                 const json = true
    //                 const { valid, error } = alchemy.validateJson(String,json)
    //                 expect(valid).toBe(false)
    //             })
    //             it('should not validate false', () => {
    //                 const json = false
    //                 const { valid, error } = alchemy.validateJson(String,json)
    //                 expect(valid).toBe(false)
    //             })
    //         })
    //     })
    //     describe('date', () => {
    //         it('should validate a date string', () => {
    //             const json = new Date().toISOString()
    //             const { valid, error } = alchemy.validateJson(Date, json)
    //             expect(valid).toBe(true)
    //         })
    //         it('should not validate an invalid date string', () => {
    //             const json = 'foo'
    //             const { valid, error } = alchemy.validateJson(Date, json)
    //             expect(valid).toBe(false)
    //         })
    //     })
    //     describe('model with fields', () => {
    //         describe('primitives', () => {
    //             describe('string', () => {
    //                 it('should be valid', () => {
    //                     @Model class Foo {
    //                         @Field foo: string
    //                     }
    
    //                     const json = {
    //                         foo: "This is a string"
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(true)
    //                 })
    //                 it('should be invalid if it is a number', () => {
    //                     @Model class Foo {
    //                         @Field foo: string
    //                     }
    
    //                     const json = {
    //                         foo: 42
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if it is an array', () => {
    //                     @Model class Foo {
    //                         @Field foo: string
    //                     }
    
    //                     const json = {
    //                         foo: ['strings','strings','strings']
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if is a boolean', () => {
    //                     @Model class Foo {
    //                         @Field foo: string
    //                     }
    
    //                     const json = {
    //                         foo: true
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if it is an object', () => {
    //                     @Model class Foo {
    //                         @Field foo: string
    //                     }
    
    //                     const json = {
    //                         foo: { bar: 'baz' }
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //             })
    //             describe('number', () => {
    //                 it('should be valid', () => {
    //                     @Model class Foo {
    //                         @Field foo: number
    //                     }
    
    //                     const json = {
    //                         foo: 42
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(true)
    //                 })
    //                 it('should be invalid if it is a string', () => {
    //                     @Model class Foo {
    //                         @Field foo: number
    //                     }
    
    //                     const json = {
    //                         foo: "This is a string"
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                 })
    //                 it('should be invalid if it is an array', () => {
    //                     @Model class Foo {
    //                         @Field foo: number
    //                     }
    
    //                     const json = {
    //                         foo: [42,42,42]
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if is a boolean', () => {
    //                     @Model class Foo {
    //                         @Field foo: number
    //                     }
    
    //                     const json = {
    //                         foo: true
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if it is an object', () => {
    //                     @Model class Foo {
    //                         @Field foo: number
    //                     }
    
    //                     const json = {
    //                         foo: { bar: 'baz' }
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //             })
    //             describe('boolean', () => {
    //                 it('should be valid', () => {
    //                     @Model class Foo {
    //                         @Field foo: boolean
    //                     }
    
    //                     const json = {
    //                         foo: true
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(true)
    //                 })
    //                 it('should be invalid if is a number', () => {
    //                     @Model class Foo {
    //                         @Field foo: boolean
    //                     }
    
    //                     const json = {
    //                         foo: 42
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if it is a string', () => {
    //                     @Model class Foo {
    //                         @Field foo: boolean
    //                     }
    
    //                     const json = {
    //                         foo: "This is a string"
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                 })
    //                 it('should be invalid if it is an array', () => {
    //                     @Model class Foo {
    //                         @Field foo: boolean
    //                     }
    
    //                     const json = {
    //                         foo: ['strings','strings','strings']
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if it is an object', () => {
    //                     @Model class Foo {
    //                         @Field foo: boolean
    //                     }
    
    //                     const json = {
    //                         foo: { bar: 'baz' }
    //                     }
    
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
    
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //             })
    //         })
    //         describe('array', () => {
    //             describe('of numbers', () => {
    //                 it('should be valid', () => {
    //                     @Model class Foo {
    //                         @Field([Number]) foo: number[]
    //                     }
        
    //                     const json = {
    //                         foo: [42,56,88]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(true)
    //                 })
    //                 it('should be invalid if elements are strings', () => {
    //                     @Model class Foo {
    //                         @Field([Number]) foo: number[]
    //                     }
        
    //                     const json = {
    //                         foo: ["string1","string2","string3"]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if elements are a mix of numbers and strings', () => {
    //                     @Model class Foo {
    //                         @Field([Number]) foo: number[]
    //                     }
        
    //                     const json = {
    //                         foo: ["string1","string2","string3"]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if elements are booleans', () => {
    //                     @Model class Foo {
    //                         @Field([Number]) foo: number[]
    //                     }
        
    //                     const json = {
    //                         foo: [true, false, true]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //             })
    //             describe('of strings', () => {
    //                 it('should be valid', () => {
    //                     @Model class Foo {
    //                         @Field([String]) foo: string[]
    //                     }
        
    //                     const json = {
    //                         foo: ["string1","string2","string3"]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(true)
    //                 })
    //                 it('should be invalid if elements are numbers', () => {
    //                     @Model class Foo {
    //                         @Field([String]) foo: string[]
    //                     }
        
    //                     const json = {
    //                         foo: [42,58,66]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if elements are a mix of numbers and strings', () => {
    //                     @Model class Foo {
    //                         @Field([String]) foo: string[]
    //                     }
        
    //                     const json = {
    //                         foo: ["string1",42,"string3"]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //                 it('should be invalid if elements are booleans', () => {
    //                     @Model class Foo {
    //                         @Field([String]) foo: string[]
    //                     }
        
    //                     const json = {
    //                         foo: [true, false, true]
    //                     }
        
    //                     const { valid, error } = alchemy.validateJson(Foo, json)
        
    //                     expect( valid ).toBe(false)
    //                     console.log(error)
    //                 })
    //             })
    //             // describe('of booleans', () => {
    //             //     it('should be valid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             //     it('should be invalid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             // })
    //             // describe('of models', () => {
    //             //     it('should be valid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             //     it('should be invalid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             // })
    //             // describe('of dates', () => {
    //             //     it('should be valid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             //     it('should be invalid', () => {
    //             //         expect(false).toBe(true)
    //             //     })
    //             // })
    //         })
    //         describe('nested model', () => {
    //             it('should be valid', () => {
    //                 @Model class Bar {
    //                     @Field baz: Boolean
    //                 }
    
    //                 @Model class Foo {
    //                     @Field bar: Bar
    //                 }
    
    //                 const json = {
    //                     bar: {
    //                         baz: true
    //                     }
    //                 }
    
    //                 const { valid, error } = alchemy.validateJson(Foo, json)
    //                 expect( valid ).toBe(true)
    //             })
    //             it('should be invalid because of missing property on nested model', () => {
    //                 @Model class Bar {
    //                     @Field baz: Boolean
    //                 }
    
    //                 @Model class Foo {
    //                     @Field bar: Bar
    //                 }
    
    //                 const json = {
    //                     bar: {
    //                         biz: true
    //                     }
    //                 }
    
    //                 const { valid, error } = alchemy.validateJson(Foo, json)
    //                 expect( valid ).toBe(false)
    //                 console.log(error)
    //             })
    //         })
    //         describe('date', () => {
    //             beforeEach( () => {
    //                 alchemy.registerSerializer( DateSerializer )
    //             })
    //             it('should be valid', () => {
    //                 @Model class Foo {
    //                     @Field foo: Date
    //                 }
    
    //                 const json = {
    //                     foo: new Date().toISOString()
    //                 }
    
    //                 const { valid, error } = alchemy.validateJson(Foo, json)
    //                 expect( valid ).toBe(true)
    //             })
    //             it('should not be valid', () => {
    //                 @Model class Foo {
    //                     @Field foo: Date
    //                 }
    
    //                 const json = {
    //                     foo: '05 October 2011 14:48 UTC'
    //                 }
    
    //                 const { valid, error } = alchemy.validateJson(Foo, json)
    //                 expect( valid ).toBe(false)
    //             })
    //         })
    //     })
    //     describe('array', () => {
    //         describe('not an array', () => {
    //             it('should not validate a boolean', () => {
    //                 const json = true

    //                 const { valid, error } = alchemy.validateJson([Boolean], json)

    //                 expect( valid ).toBe(false)
    //             })
    //             it('should not validate a string', () => {
    //                 const json = 'a'

    //                 const { valid, error } = alchemy.validateJson([String], json)

    //                 expect( valid ).toBe(false)
    //             })
    //             it('should not validate a number', () => {
    //                 const json = 42

    //                 const { valid, error } = alchemy.validateJson([Number], json)

    //                 expect( valid ).toBe(false)
    //             })
    //             it('should not validate a date', () => {
    //                 const json = new Date().toISOString()

    //                 const { valid, error } = alchemy.validateJson([Date], json)

    //                 expect( valid ).toBe(false)
    //             })
    //             it('should not validate a model', () => {
    //                 @Model class Foo {
    //                     @Field foo: string
    //                 }

    //                 const json = { foo: 'bar' }

    //                 const { valid, error } = alchemy.validateJson([Foo], json)
    //             })
    //         })
    //         describe('array of booleans', () => {
    //             it('should be valid', () => {
    //                 const json = [true, true, false]

    //                 const { valid, error } = alchemy.validateJson([Boolean], json)

    //                 expect( valid ).toBe(true)
    //             })
    //             it('should not be valid', () => {
    //                 const json = [1, 2, 3]

    //                 const { valid, error } = alchemy.validateJson([Boolean], json)

    //                 expect( valid ).toBe(false)
    //             })
    //         })
    //         describe('array of strings', () => {
    //             it('should be valid', () => {
    //                 const json = ["a", "b", "c"]

    //                 const { valid, error } = alchemy.validateJson([String], json)

    //                 expect( valid ).toBe(true)
    //             })
    //             it('should not be valid', () => {
    //                 const json = [1, 2, 3]
                    
    //                 const { valid, error } = alchemy.validateJson([String], json)

    //                 expect( valid ).toBe(false)
    //             })
    //         })
    //         describe('array of numbers', () => {
    //             it('should be valid', () => {
    //                 const json = [1, 2, 3]

    //                 const { valid, error } = alchemy.validateJson([Number], json)

    //                 expect( valid ).toBe(true)
    //             })
    //             it('should not be valid', () => {
    //                 const json = ["a", "b", "c"]
                    
    //                 const { valid, error } = alchemy.validateJson([Number], json)

    //                 expect( valid ).toBe(false)
    //             })
    //         })
    //         describe('array of dates', () => {
    //             it('should be valid', () => {
    //                 const json = [new Date().toISOString(), new Date().toISOString()]

    //                 const { valid, error } = alchemy.validateJson([Date], json)

    //                 expect( valid ).toBe(true)
    //             })
    //             it('should not be valid', () => {
    //                 const json = ["a", "b", "c"]
                    
    //                 const { valid, error } = alchemy.validateJson([Date], json)

    //                 expect( valid ).toBe(false)
    //             })
    //         })
    //         describe('array of models', () => {
    //             it('should be valid', () => {
    //                 @Model class Foo {
    //                     @Field foo: string
    //                     @Field bar: number
    //                 }
    
    //                 const json = [
    //                     { foo: 'hello', bar: 42 },
    //                     { foo: 'goodbye', bar: 56 }
    //                 ]

    //                 const { valid, error } = alchemy.validateJson([Foo], json)
    //                 expect(valid).toBe(true)
    //             })
    //         })
    //     })

    // })

})