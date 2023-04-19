import { describe, it } from "@agape/demo"
import { getTerminalSize } from "@agape/terminal"

describe('getTerminalSize', 'interactive', () => {
    it('should run', async () => {
        const size = getTerminalSize()
        console.log(size)
    })
})