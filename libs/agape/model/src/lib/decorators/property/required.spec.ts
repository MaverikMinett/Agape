import { ModelDescriptor } from '../../descriptors';
import { Model } from '../class/model'
import { Required } from './required'

describe('Required', () => {


    it('should create a field descriptor', () => {
        @Model class Foo {
            @Required bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(1)
        expect(d.fields.has('bar')).toBe(true)
    })

    it('should have the required option set to true', () => {
        @Model class Foo {
            @Required bar: string;
        }
        
        const d: ModelDescriptor = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.fields.length).toBe(1)
        expect(d.fields.get('bar').optional).toBe(false)
    })

})