import { keypress } from '@lib/cli';
import chalk from 'chalk';
import readline from 'readline';

const getCursorPos = () => new Promise<{rows: string, cols: string}>((resolve) => {
    const termcodes = { cursorGetPosition: '\u001b[6n' };

    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);

    const readfx = function () {
        const buf = process.stdin.read();
        const str = JSON.stringify(buf); // "\u001b[9;1R"
        const regex = /\[(.*)/g;
        const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
        const pos = { rows: xy[0], cols: xy[1] };
        process.stdin.setRawMode(false);
        resolve(pos);
    }

    process.stdin.once('readable', readfx);
    process.stdout.write(termcodes.cursorGetPosition);
})

export interface NavmenuItem {
    key?: string
    label: string;
}

export class NavmenuComponent {


    selectedIndex: number = 0

    selectedItem: NavmenuItem

    // items: NavmenuItem[] = []

    constructor( public items: NavmenuItem[] = [] ) {
        this.selectedItem = items[0]
    }

    async render() {
        let index = 0;
        for ( let item of this.items ) {
            const formatter = index === this.selectedIndex ? chalk.green : chalk.blue
            const formattedText = formatter(item.label)
            console.log( index + " " + formattedText )
            index++;
        }
        
        const key = await keypress()
        if ( key.name === 'down' ) {
            if ( this.selectedIndex < this.items.length - 1 ) this.selectedIndex++
        }
        else if ( key.name === 'up' ) {
            if ( this.selectedIndex > 0 ) this.selectedIndex--
        }
        return this.rerender()
    }

    async run() {
        await this.render()
    }

    async rerender() {
    const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const pos = await getCursorPos()
        // console.log(pos)

        readline.cursorTo(process.stdout, 0, Number(pos.rows) - 3 - 1)
        // readline.clearScreenDown(process.stdout);
        // clear three lines of text
        await this.render()
    }

    
}


