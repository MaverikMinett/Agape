import { keypress } from '@agape/terminal';

export class AnyKeyToContinueComponent {

    async run() {
        console.log("\n" + "  ʔ Press any key to Continue" + "\n")
        await keypress()
    }


}