
import { CliMenuControl } from './menu.control'

describe('CliMenuControl', () => {

    let c: CliMenuControl

    beforeEach( () => {
        c = undefined
    })
    describe('sanity', () => {
        it('should be sane', () => {
            expect(true).toBe(true)
        })
    })
    it('should instantiate', () => {
        c = new CliMenuControl()
        expect(c).toBeTruthy()
    })

})

