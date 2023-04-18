import { AnyKeyToContinueComponent, CliBannerComponent } from "@lib/cli"
import { describe, it } from "@lib/demo"

describe('BannerComponent', 'interactive', async () => {
    it('should display a banner', async () => {
        const component = new CliBannerComponent('Banner')
        await component.run()
    })
    it('should work with AnyKeyToContinueComponent', async () => {
        const component1 = new CliBannerComponent('Banner')
        const component2 = new AnyKeyToContinueComponent()
        const components = [ component1, component2 ]
        for ( let c of components ) {
            await c.run()
        }
    })
    it('should work with multiple AnyKeyToContinueComponent', async () => {
        const component1 = new CliBannerComponent('Banner')
        const component2 = new AnyKeyToContinueComponent()
        const component3 = new AnyKeyToContinueComponent()
        const components = [ component1, component2, component3 ]
        for ( let c of components ) {
            await c.run()
        }
    })
})
