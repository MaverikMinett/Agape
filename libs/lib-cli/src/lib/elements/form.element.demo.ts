import { describe, expect, fdescribe, it } from '@agape/demo'
import { CliFormElement } from './form.element'

fdescribe('CliFormElement', 'interactive', () => {
    it('should instantiate', () => {
        const e = new CliFormElement()
        expect(e).toBeInstanceOf(CliFormElement)
    })
    
})

