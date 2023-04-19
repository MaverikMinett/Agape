import { describe, fdescribe, fit, it, expect } from "@agape/demo";
import { Clip } from "./clip";


describe('CLip', 'interactive', () => {
    
    it('should instantiate', () => {
        const clip = new Clip()
        expect(clip).toBeInstanceOf(Clip)
    })

    it('should have the menu directly at the menu accessor', async () => {
        const clip = new Clip()
        clip.menu(' ', [
            {label: 'back', back: true},
            {label: 'some option' },
            {label: 'some other option' }
        ])
        const response = await clip.run()
        console.log(response )
    })
})