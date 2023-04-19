
import { CliInputControl } from './input.control'

describe('CliInputControl', () => {

    let c: CliInputControl

    beforeEach( () => {
        c = undefined
    })
    describe('sanity', () => {
        it('should be sane', () => {
            expect(true).toBe(true)
        })
    })
    it('should instantiate', () => {
        c = new CliInputControl()
        expect(c).toBeTruthy()
    })

})

