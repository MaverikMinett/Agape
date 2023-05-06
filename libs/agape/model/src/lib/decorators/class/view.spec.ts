
import { ModelDescriptor, ViewDescriptor } from '../../descriptors';
import { Field } from '../property/field'
import { Model } from './model'
import { View } from './view'

describe('View', () => {
    it('should create a model descriptor', () => {
        @Model class Foo {

            @Field bar: string

        }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d).toBeInstanceOf(ModelDescriptor)
        expect(d.name).toBe('Foo')
    })

    it('should create a view descriptor', () => {
        @Model class Foo {
            @Field bar: string
        }

        interface FooDetail extends Foo {}
        @View(Foo) class FooDetail {}

        const d = Reflect.getMetadata( "model:descriptor", FooDetail );
        expect(d).toBeInstanceOf(ViewDescriptor)
    })

    it('should have the field from the model', () => {
        @Model class Foo {
            @Field bar: string
        }

        interface FooDetail extends Foo {}
        @View(Foo) class FooDetail {}

        const d = Reflect.getMetadata( "model:descriptor", FooDetail );
        expect(d.fields.length).toBe(1)
        expect(d.fields.has('bar')).toBe(true)
    })

    it('should have the fields from the model', () => {
        @Model class Foo {
            @Field bar: string
            @Field biz: number
        }

        interface FooDetail extends Foo {}
        @View(Foo) class FooDetail {}

        const d = Reflect.getMetadata( "model:descriptor", FooDetail );
        expect(d.fields.length).toBe(2)
        expect(d.fields.has('bar')).toBe(true)
        expect(d.fields.has('biz')).toBe(true)
    })

    it('should have no fields from the model', () => {
        @Model class Foo {
            @Field bar: string
            @Field biz: number
        }

        @View(Foo, []) class FooNone {}

        const d = Reflect.getMetadata( "model:descriptor", FooNone );
        expect(d.fields.length).toBe(0)
    })

    it('should have the specified field from the model', () => {
        @Model class Foo {
            @Field bar: string
            @Field biz: number
        }

        @View(Foo, ['bar']) class FooNone {}

        const d = Reflect.getMetadata( "model:descriptor", FooNone );
        expect(d.fields.has('bar')).toBe(true)
        expect(d.fields.has('biz')).toBe(false)
    })

    it('should throw an error if the field does not exist on the model', () => {
        @Model class Foo {
            @Field bar: string
            @Field biz: number
        }

        expect(
            () => {
                // @ts-ignore (correctly failes typescript checks)
                @View(Foo, ['buz']) class FooNone {}
            }
        ).toThrowError()

    })

    describe('field selection parameter', () => {
        describe('pick', () => {
            it('should add the specified fields', () => {

            })
            it('should not add the other fields', () => {

            })
            it('cannot be used with omit', () => {

            })
            it('cannot be used with partial', () => {

            })
        })
        describe('omit', () => {
            it('should not add the specified fields', () => {

            })
            it('should add the other fields', () => {

            })
            it('cannot be used with pick', () => {

            })
            it('cannot be used with partial', () => {

            })
        })
        describe('partial', () => {
            it('should add all fields', () => {

            })
            it('should set all fields required to false', () => {

            })
            it('accepts a boolean', () => {

            })
            it('cannot be used with pick', () => {

            })
            it('cannot be used with omit', () => {

            })
            it('cannot be used with optional', () => {

            })
            it('cannot be used with required', () => {

            })
        })
        describe('optional', () => {
            it('add the specified fields', () => {

            })
            it('sets the specified fields required to false', () => {

            })
            it('does not mix fields with required', () => {

            })
        })
        describe('required', () => {
            it('add the specified fields', () => {
                
            })
            it('sets the specified fields required to true', () => {

            })
            it('does not mix fields with optional', () => {

            })
        })
    })


})