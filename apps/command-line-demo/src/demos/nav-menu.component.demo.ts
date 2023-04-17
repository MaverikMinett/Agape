import { describe, it } from "@lib/demo"
import { NavmenuComponent } from "../app/navmenu.component"

describe('NavMenuComponent', 'interactive', () => {
    it('should run', async () => {
        const c = new NavmenuComponent([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })
})