import { ModelDescriptor } from '../../descriptors';
import { Model } from '../class/model'
import { Primary } from './primary'

describe('Field', () => {


    it('should create a field descriptor', () => {
        @Model class Foo {
            @Primary bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(1)
        expect(d.fields.has('bar')).toBe(true)
    })

    it('should have the primary option set to true', () => {
        @Model class Foo {
            @Primary bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(1)
        expect(d.fields.get('bar').primary).toBe(true)
    })

})