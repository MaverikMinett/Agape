
import { ModelDescriptor } from '../../descriptors';
import { Model } from './model'


describe('Model', () => {
    it('should create a model descriptor', () => {
        @Model class Foo { }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d).toBeInstanceOf(ModelDescriptor)
    })
    it('should create a model descriptor', () => {
        @Model class Foo { }
    })
    it('should accept empty parameters list', () => {
        @Model() class Foo {}
    })
    it('should auto-populate the name of the model descriptor', () => {
        @Model class Foo { }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.name).toBe('Foo')
    })
    it('should not auto-populate the name of the model descriptor', () => {
        @Model({ name: 'Bar' }) class Foo { }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.name).toBe('Bar')
    })
    it('should auto-populate the symbol of the model descriptor', () => {
        @Model class Foo { }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d.symbol).toBe('Foo')
    })
})