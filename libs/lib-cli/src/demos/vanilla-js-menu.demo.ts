import { describe, it } from "@lib/demo"
import { getCursorPosition, keypress } from "@agape/terminal"
import readline from 'readline'

describe('vanilla js menu component', 'interactive', () => {
    it('should run', async () => {
        let selectedIndex = 0

        async function printOptions() {
            console.log( (selectedIndex == 0 ? ">" : " ") + " Row 1" )
            console.log( (selectedIndex == 1 ? ">" : " ") + " Row 2" )
            console.log( (selectedIndex == 2 ? ">" : " ") + " Row 3" )
        }

        /* this is the fix, changed clearOptions to write "\r\x1b[K" instead of using readline.Clear... */
        async function clearOptions() {
            const pos = await getCursorPosition()
            process.stdout.write("\r\x1b[K")
            readline.cursorTo(process.stdout, 0, pos.row - 1)
            process.stdout.write("\r\x1b[K")
            readline.cursorTo(process.stdout, 0, pos.row - 2)
            process.stdout.write("\r\x1b[K")
            readline.cursorTo(process.stdout, 0, pos.row - 3)
            process.stdout.write("\r\x1b[K")
        }

        await printOptions()

        let userResponded = false
        let userResponse: number
        while( userResponded === false ) {
            const key = await keypress()
            if ( key.name == 'down' ) {
                selectedIndex++
                if ( selectedIndex > 3 - 1) { selectedIndex = 3 - 1 }
                await clearOptions()
                await printOptions()
            }
            if ( key.name == 'up' ) {
                selectedIndex--
                if ( selectedIndex < 0 ) { selectedIndex = 0 } 
                await clearOptions()
                await printOptions()
            }
            if ( key.name == 'return' ) {
                selectedIndex--
                if ( selectedIndex < 0 ) { selectedIndex = 0 } 
                await clearOptions()
                await printOptions()
                userResponded = true
                userResponse = selectedIndex
            }
        }

        console.log("User Response is "  + selectedIndex )
    })
})
