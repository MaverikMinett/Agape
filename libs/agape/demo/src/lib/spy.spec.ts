

import { Spy } from './spy'


describe('Spy', () => {
    
    let s: Spy
    
    beforeEach( () => {
        s = undefined
    })
    it('should instantiate', () => {
        s = new Spy()
    })
})

