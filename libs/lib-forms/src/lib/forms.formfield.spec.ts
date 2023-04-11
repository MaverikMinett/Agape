import { FormField } from './forms';

describe('FormField', () => {

    let f: FormField
    beforeEach( () => {

    })

    it('should instantiate', () => {
        f = new FormField('string', 'foo')
        expect(f).toBeTruthy()
    });

    it('should create the label from the name', () => {
        f = new FormField('string', 'foo')
        expect(f.label).toBe('Foo')
        expect(f).toBeTruthy()
    })

    describe('string field', () => {
        it('should create a string field', () => {
            f = new FormField('string', 'foo')
            expect(f.type).toBe('string')
        })
    })

});


