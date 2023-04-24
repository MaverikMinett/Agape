import { FormBuilder } from "./form-builder"
import { FormGroup } from "./form-group"

describe('FormBuilder', () => {


    let fb: FormBuilder

    beforeEach( () => {
        fb = undefined
    })

    it('should instantiate', () => {
        fb = new FormBuilder()
        expect(fb).toBeTruthy()
    })

    describe('string', () => {
        beforeEach( () => {
            fb = new FormBuilder()
        })
        it('should return a new FormGroup instance', () => {
            expect( fb.string('test') ).toBeInstanceOf(FormGroup)
        })
        it ('should have called string on the new formgroup instance', () => {
            const f = fb.string('test')

            expect( f.has('test') ).toBeTruthy()
            expect( f.get('test').type ).toBe('string')
        })
    })

    describe('number', () => {
        beforeEach( () => {
            fb = new FormBuilder()
        })
        it('should return a new FormGroup instance', () => {
            expect( fb.number('test') ).toBeInstanceOf(FormGroup)
        })
        it ('should have called string on the new formgroup instance', () => {
            const f = fb.number('test')

            expect( f.has('test') ).toBeTruthy()
            expect( f.get('test').type ).toBe('number')
        })
    })
})