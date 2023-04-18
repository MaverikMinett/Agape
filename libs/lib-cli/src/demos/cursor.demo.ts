import { describe, fit, it } from "@lib/demo"
import { getCursorPosition } from "@agape/terminal"

describe('getCursorPosition', 'interactive', () => {
    it('should run', async () => {
        const position = await getCursorPosition()
        console.log("Cursor position", position)
    })
})

