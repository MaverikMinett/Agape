import { FormGroup, FormField } from './forms';

describe('FormGroup', () => {

    let f: FormGroup
    beforeEach( () => {

    })

    it('should instantiate', () => {
        f = new FormGroup()
        expect(f).toBeTruthy()
    });

    describe('string', () => {
        it('should create a string field', () => {
            f = new FormGroup()
            f.string('name')   
        })
        it('should return itself', () => {
            f = new FormGroup()
            const g = f.string('name')  
            expect(f).toBe(g)
        })
        it('usage', () => {
            f = new FormGroup().string('name')  
            expect(f).toBeInstanceOf(FormGroup)
        })
        it('should have the string fields', () => {
            f = new FormGroup().string('name')  
            expect(f.has('name')).toBe(true)
        })
        // describe('errors', () => {
        //     it('should error if name or label are undefined', () => {
                
        //     })
        // })
    })

    describe('has', () => {
        it('should have the field', () => {
            f = new FormGroup()
            f.string('name')   
            expect(f.has('name')).toBe(true)
        })
        it('should not have the field', () => {
            f = new FormGroup()
            f.string('foo')   
            expect(f.has('bar')).toBe(false)
        })
    })

    describe('get', () => {
        it('should retrieve the field', () => {
            f = new FormGroup()
            f.string('name')   
            expect(f.get('name')).toBeInstanceOf(FormField)
        })
        it('should be undefined if field does not exist', () => {
            f = new FormGroup()
            f.string('foo')   
            expect(f.get('bar')).toBe(undefined)
        })
    })

});


