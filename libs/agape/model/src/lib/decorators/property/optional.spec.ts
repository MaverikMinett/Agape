import { ModelDescriptor } from '../../descriptors';
import { Model } from '../class/model'
import { Optional } from './optional'
import { Field } from './field'

describe('Nullable', () => {


    it('should set optional to true when called with no paramaters', () => {
        @Model class Foo {
            @Optional 
            @Field bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.get('bar').optional).toBe(true)
    })

    it('should set explicitly set optional to true', () => {
        @Model class Foo {
            @Optional(true)
            @Field bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.get('bar').optional).toBe(true)
    })

    it('should set optional to false', () => {
        @Model class Foo {
            @Optional(false)
            @Field bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.get('bar').optional).toBe(false)
    })

    it('should create the field when no field decorator is present', () => {
        @Model class Foo {
            @Optional bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.get('bar')).toBeTruthy()
    })

    it('should create the field with parameters when no field decorator is present', () => {
        @Model class Foo {
            @Optional({description: 'Baz'}) bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.get('bar')).toBeTruthy()
        expect(d.fields.get('bar').description).toBe('Baz')
    })

})