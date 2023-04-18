import { describe, fdescribe, expect, it } from "@lib/demo"
import { CliMenuComponent } from "libs/lib-cli/src/lib/components/menu.component"

describe('CliMenuComponent', 'interactive', () => {

    it('should instantiate', () => {
        const c = new CliMenuComponent('fooMenu',[
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        expect(c).toBeTruthy()
    })

    it('should run', async () => {
        const c = new CliMenuComponent('fooMenu',[
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })

})
