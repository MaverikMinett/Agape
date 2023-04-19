import { describe, fdescribe, fit, it, expect } from "@agape/demo";
import { Clip } from "./clip";
import { Menu } from "@lib/menu";


describe('CLip', 'interactive', () => {
    
    it('should instantiate', () => {
        const clip = new Clip()
        expect(clip).toBeInstanceOf(Clip)
    })

    it('should have the menu directly at the menu accessor', async () => {
        const clip = new Clip()
        const m = new Menu()
        .item('Menu Option 1')
        .item('Menu Option 2')
        .item('Menu Option 3')

        clip.menu(m)
        const response = await clip.run()
        console.log(response )
    })
})