import { describe, it } from "@agape/demo"
import { getCursorPosition, keypress } from "@agape/terminal"

describe('vanilla js input field', 'interactive', () => {
    it('should run', async () => {
        let value = ""

        async function printControl() {
            process.stdout.write("Question> " + value )
        }
    
        async function clearPrintControl() {
            const pos = await getCursorPosition()
            process.stdout.write("\r\x1b[K")
        }
        
        printControl()
    
        let userResponded = false
        let userResponse: string
        while( userResponded === false ) {
            const key = await keypress()
            if ( key.name == 'down' ) {
                await clearPrintControl()
                await printControl()
            }
            else if ( key.name == 'up' ) {
                await clearPrintControl()
                await printControl()
            }
            else if ( key.name == 'return' ) {
                userResponded = true
                userResponse = value
            }
            else if ( key.name === 'backspace' ) {
                value = value.substring(0,value.length-1)
                await clearPrintControl()
                await printControl()
            }
            else {
                value += key.sequence
                await clearPrintControl()
                await printControl()
            }
        }
    
        return value
    })
})