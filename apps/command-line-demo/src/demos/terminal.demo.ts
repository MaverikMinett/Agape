import { describe, it } from "@lib/demo"
import { getTerminalSize } from "@agape/terminal"

describe('getTerminalSize', 'interactive', () => {
    it('should run', async () => {
        const size = getTerminalSize()
        console.log(size)
    })
})