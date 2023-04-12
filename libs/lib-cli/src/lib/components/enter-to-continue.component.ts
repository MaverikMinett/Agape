
import process from 'process';

export class EnterToContinueComponent {

    async run() {
        console.log("\n" + "  ⏎ Press Enter to Continue" + "\n")
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
    }


}