
import { Menu } from '@lib/menu'
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
        const m = new Menu()
        c = new CliMenuControl(m)
        expect(c).toBeTruthy()
    })

})

