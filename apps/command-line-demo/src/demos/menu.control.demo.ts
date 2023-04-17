import { CliMenuControl } from "@lib/cli"
import { describe, expect, it } from "@lib/demo"


describe('CliMenuControl', 'interactive', () => {

    it('should instantiate', () => {
        const c = new CliMenuControl([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        expect(c).toBeTruthy()
    })

    it('should run', async () => {
        const c = new CliMenuControl([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })

})