
import { CliParagraphElement } from './paragraph.element'

describe('CliParagraphElement', () => {

    let e: CliParagraphElement
    
    it('should instantiate', () => {
        e = new CliParagraphElement()
        expect(e).toBeInstanceOf(CliParagraphElement)
    })

})