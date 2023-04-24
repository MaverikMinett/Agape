
import { keypress } from '@agape/terminal'


/**
 * Enter to continue component
 */
export class EnterToContinueComponent {

    async run() {
        console.log("\n" + "  ⏎ Press Enter to Continue" + "\n")
        await keypress('return')
    }


}