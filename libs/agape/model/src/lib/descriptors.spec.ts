import { Model } from "./decorators/model";
import { FieldDescriptor, ModelDescriptor } from "./descriptors"


describe('FieldDescriptor', () => {
    let f: FieldDescriptor

    afterEach(() => {
        f = undefined;
    })

    it('should instantiate', () => {
        f = new FieldDescriptor('foo')
    })

    it('should set the name of the field', () => {
        f = new FieldDescriptor('foo')
        expect(f.name).toBe('foo')
    })

    it('should set the field type', () => {
        f = new FieldDescriptor('foo', 'string')
        expect(f.type).toBe('string')
    })

    it('should set the widget type', () => {
        f = new FieldDescriptor('foo', 'string', 'textarea')
        expect(f.widget).toBe('textarea')
    })

})

describe('ModelDescriptor', () => {

    let m: ModelDescriptor
    let f: FieldDescriptor

    afterEach(() => {
        m = undefined;
        f = undefined;
    })

    it('should instantiate', () => {
        m = new ModelDescriptor()
        expect(m).toBeTruthy()
    })

    describe('instantiation with name', () => {
        it('should instantiate', () => {
            m = new ModelDescriptor('foo');
            expect(m).toBeTruthy()
        })
        it('should set the name', () => {
            m = new ModelDescriptor('foo');
            expect(m.name).toBe('foo')
        })
        it('should set the label', () => {
            m = new ModelDescriptor('foo');
            expect(m.label).toBe('Foo')
        })
        it('should set the plural of the label', () => {
            m = new ModelDescriptor('foo');
            expect(m.plural).toBe('Foos')
        })
        it('should set the token', () => {
            m = new ModelDescriptor('foo');
            expect(m.token).toBe('foo')
        })
        it('should set the plural of the token', () => {
            m = new ModelDescriptor('foo');
            expect(m.tokens).toBe('foos')
        })
    })


    describe('instantiation with parameters', () => {
        it('should instantiate', () => {
            const params = { name: 'foo' }
            m = new ModelDescriptor(params);
            expect(m).toBeTruthy()
        })
        it('should set label from the name', () => {
            const params = { name: 'foo' }
            m = new ModelDescriptor(params)
            expect(m.name).toBe('foo')
            expect(m.label).toBe('Foo')
        })
        it('should set name from the label', () => {
            const params = { label: 'Foo' }
            m = new ModelDescriptor(params)
            expect(m.name).toBe('foo')
            expect(m.label).toBe('Foo')
        })
    })

    describe( 'should instantiate with a name and parameters', () => {
        it('should instantiate', () => {
            const params = { label: 'Food' }
            m = new ModelDescriptor('foo', params );
            expect(m).toBeTruthy()
        })    
        it('should set name from the argument', () => {
            const params = { label: 'Food' }
            m = new ModelDescriptor('foo', params)
            expect(m.name).toBe('foo')
        })    
        it('should set label from the parameters', () => {
            const params = { label: 'Food' }
            m = new ModelDescriptor('foo', params)
            expect(m.label).toBe('Food')
        })
    })

    describe('add', () => {
        it('should add a field', () => {
            f = new FieldDescriptor('bar')
            m = new ModelDescriptor('foo')
            m.add(f)
            expect(m.fields.has('bar')).toBe(true)
        })
    })

})

