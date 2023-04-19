import { describe, fdescribe, expect, it } from "@agape/demo"
import { Menu } from "@lib/menu"
import { CliMenuComponent } from "./menu.component"

describe('CliMenuComponent', 'interactive', () => {

    it('should instantiate', () => {
        const m = new Menu()
        .item('Menu Option 1')
        .item('Menu Option 2')
        .item('Menu Option 3')

        const c = new CliMenuComponent('fooMenu',m)
        expect(c).toBeTruthy()
    })

    it('should run', async () => {
        const m = new Menu()
        .item('Menu Option 1')
        .item('Menu Option 2')
        .item('Menu Option 3')

        const c = new CliMenuComponent('fooMenu',m)
        const response = await c.run()
        console.log( 'Selected', response )
    })

})
