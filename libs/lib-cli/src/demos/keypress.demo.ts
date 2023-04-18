
import { fdescribe, describe, it, expect } from '@agape/demo'
import { keypress } from '@agape/terminal'

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