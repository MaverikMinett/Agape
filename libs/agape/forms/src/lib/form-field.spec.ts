import { FormField } from './form-field';

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
        // if('should have a default length of 256', () => {

        // })
    })
    describe('number field', () => {
        it('should create a number field', () => {
            f = new FormField('number', 'foo')
            expect(f.type).toBe('number')
        })
    })
});


