
import { ModelDescriptor } from '../../descriptors';
import { Field } from './field'
import { Model } from '../class/model'

describe('Field', () => {
    it('should create a model descriptor', () => {
        @Model class Foo {

            @Field bar: string

        }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d).toBeInstanceOf(ModelDescriptor)
        expect(d.name).toBe('Foo')
    })

    it('should create a field descriptor', () => {
        @Model class Foo {
            @Field bar: string;
        }
        
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(1)
        expect(d.fields.has('bar')).toBe(true)
    })

    it('should create multiple field descriptors', () => {
        @Model class Foo {
            @Field bar: string;

            @Field baz: string;
        }
        
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(2)
        expect(d.fields.has('bar')).toBe(true)
        expect(d.fields.has('baz')).toBe(true)
    })

    it('should create multiple models', () => {
        @Model class Foo {
            @Field bar: string;

            @Field baz: string;
        }

        @Model class Goo {
            @Field car: string;

            @Field caz: string;

            @Field cuz: number;
        }
        
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d).toBeInstanceOf(ModelDescriptor)
        expect(d.fields.length).toBe(2)
        expect(d.fields.has('bar')).toBe(true)
        expect(d.fields.has('baz')).toBe(true)

        const e = Reflect.getMetadata( "model:descriptor", Goo );
        expect(e).toBeInstanceOf(ModelDescriptor)
        expect(e.fields.length).toBe(3)
        expect(e.fields.has('car')).toBe(true)
        expect(e.fields.has('caz')).toBe(true)
        expect(e.fields.has('cuz')).toBe(true)
    })

    it('should have choices', () => {

        const FOO_BAZ_CHOICES = [
            { value: 'biz', label: 'Biz' }
        ]

        @Model class Foo {
            @Field bar: string;

            @Field({ choices: FOO_BAZ_CHOICES })
            baz: string;
        }

        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect( d.field('baz').choices ).toEqual( FOO_BAZ_CHOICES )

    })

})