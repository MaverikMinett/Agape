
import { describe, it, expect } from '@lib/demo'
import { keypress } from '@lib/terminal'

describe('keypress', 'interactive', () => {
    it('should await a keypress', async() => {
        console.log("\n  Press any key to continue\n")
        const key = await keypress()
        expect(key).toBeTruthy()
    })
    it('it should await specific keypress', async() => {
 
        console.log("Press any key to continue")
        await keypress()
    
        console.log("Press c key to continue")
        await keypress('c')
    
        console.log("Press return key to continue")
        await keypress('return')     
    })
})