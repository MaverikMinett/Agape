import { FormField } from './form-field';
import { FormGroup } from './form-group';


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

    describe('number', () => {
        it('should create a number field', () => {
            f = new FormGroup()
            f.number('age')   
        })
        it('should return itself', () => {
            f = new FormGroup()
            const g = f.number('age')  
            expect(f).toBe(g)
        })
        it('usage', () => {
            f = new FormGroup().number('age')  
            expect(f).toBeInstanceOf(FormGroup)
        })
        it('should have the number fields', () => {
            f = new FormGroup().number('age')  
            expect(f.has('age')).toBe(true)
        })
    })

    describe('setValue', () => {
        it('should set the value of the form', () => {
            const v = { 'age': 42 }
            f = new FormGroup()
                .number('age')  
                .setValue(v)
            
            expect( f.value ).toBe(v)
        })

        it('should retrieve the value of the form', () => {
            const v = { 'age': 42 }
            f = new FormGroup()
                .number('age')  
                .setValue(v)
            
            expect( f.value ).toBe(v)
        })
    })

    describe('patchValue', () => {
        it('should patch the form value', () => {
            const v = { 'age': 42 }
            f = new FormGroup(v)
                .number('age')  
            
            f.patchValue({ age: 36})
            expect( f.value ).toEqual({'age': 36})
            expect( v ).toEqual({'age': 36})
        })
    })

});


