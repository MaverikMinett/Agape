import { expect, describe, fdescribe, it, xit, fit } from '@agape/demo'
import { FormGroup } from '@agape/forms'

import { CliFormComponent } from './form.component'

describe('CliFormComponent', 'interactive', () => {
    it('should instantiate', () => {
        const f = new FormGroup().string('foo')
        const e = new CliFormComponent(' ', f )
        expect(e).toBeInstanceOf(CliFormComponent)
    })
    it('should display the form', async () => {
        const f = new FormGroup()
            .string('foo')
            .string('bar')
        const e = new CliFormComponent(' ', f)
        await e.run()
    })
    it('should have values', async () => {
        const f = new FormGroup()
            .string('foo')
            .string('bar')
        const e = new CliFormComponent(' ', f)
        const response = await e.run()
        console.log(f.value)
        console.log(response)
    })
})

