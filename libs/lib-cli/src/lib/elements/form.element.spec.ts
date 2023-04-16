
import { CliFormElement } from './form.element'

describe('CliFormElement', () => {

    let e: CliFormElement
    
    it('should instantiate', () => {
        e = new CliFormElement()
        expect(e).toBeInstanceOf(CliFormElement)
    })

})