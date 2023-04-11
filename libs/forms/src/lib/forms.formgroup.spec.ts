import { FormGroup } from './forms';

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
    })

    describe('has', () => {

    })

});


