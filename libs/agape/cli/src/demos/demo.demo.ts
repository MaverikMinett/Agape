
import { describe, it, expect } from '@agape/demo'
import { keypress } from '@agape/terminal'

describe('describe with interactive keyword', 'interactive', () => {
    it('should await a keypress', async() => {
        console.log("\n  Press any key to continue\n")
        const key = await keypress()
        expect(key).toBeTruthy()
    })
})