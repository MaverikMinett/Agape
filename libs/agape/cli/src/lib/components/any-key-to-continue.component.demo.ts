import { AnyKeyToContinueComponent } from "./any-key-to-continue.component"
import { describe, fit, it } from "@agape/demo"

describe('AnyKeyToContinueComponent', 'interactive', () => {
    it('should run', async () => {
        const component = new AnyKeyToContinueComponent()
        await component.run()
    })
    it('should run multiple instances', async () => { 
        const component1 = new AnyKeyToContinueComponent()
        const component2 = new AnyKeyToContinueComponent()
        const components = [ component1, component2 ]
        for ( let c of components ) {
            await c.run()
        }
    })
})