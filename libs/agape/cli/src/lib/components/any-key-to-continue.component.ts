import { keypress } from '@agape/terminal';


/**
 * "Press any key to continue" component
 */
export class AnyKeyToContinueComponent {

    async run() {
        console.log("\n" + "  Press any key to Continue" + "\n")
        await keypress()
    }


}