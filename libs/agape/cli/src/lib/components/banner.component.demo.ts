import { describe, fit, it } from "@agape/demo"

import { CliBannerComponent } from './banner.component'
import { AnyKeyToContinueComponent } from './any-key-to-continue.component'


describe('BannerComponent', 'interactive', async () => {
    fit('should display a banner', async () => {
        const component = new CliBannerComponent('Banner')
        await component.run()
    })
    fit('should work with AnyKeyToContinueComponent', async () => {
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
