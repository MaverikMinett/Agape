
import process from 'process';
import { keypress } from '../keypress';

export class AnyKeyToContinueComponent {

    async run() {
        console.log("\n" + "  ʔ Press any key to Continue" + "\n")
        await keypress()
    }


}