import { describe, fit, it } from "@agape/demo"
import { getCursorPosition } from "@agape/terminal"

describe('getCursorPosition', 'interactive', () => {
    it('should run', async () => {
        const position = await getCursorPosition()
        console.log("Cursor position", position)
    })
})

