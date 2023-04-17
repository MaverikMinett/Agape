import { CliInputControl } from "@lib/cli"
import { describe, it } from "@lib/demo"

describe('CliInputControl', 'interactive', () => {
    it('should run', async () => {
        const control = new CliInputControl()
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with label', async () => {
        const control = new CliInputControl('Foo')
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with no answer', async () => {
        const control = new CliInputControl('Foo')
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with required', async () => {
        const control = new CliInputControl('Foo', { required: true })
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with exisiting value', async () => {
        const control = new CliInputControl('Foo', { value: 'Anything' })
        const response = await control.run()
        console.log( "Received response: ", response )    
    })
    it('input with exisiting value and preset cursor position', async () => {
        const control = new CliInputControl(
            'Foo', 
            { value: 'Anything', cursorPosition: 3 }
        )
        const response = await control.run()
        console.log( "Received response: ", response )   
    })
    it('input with exisiting value and preset cursor position via properties', async () => {
        const control = new CliInputControl('Foo')

        control.value = 'Everything'
        control.cursorPosition = 3
    
        const response = await control.run()  
    })
})
