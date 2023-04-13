import { keypress, getCursorPosition } from '@lib/cli';
import chalk from 'chalk';
import readline from 'readline';

export interface NavmenuItem {
    key?: string
    label: string;
}

export class NavmenuComponent {

    selectedIndex: number = -1

    selectedItem: NavmenuItem

    menuItemFormatter = (item) => {
        const text =  "  " + item.label
        return text
    }

    selectedMenuItemFormatter = (item) => {
        const text =  chalk.cyan("❯") + " " + chalk.underline.cyan(item.label)
        return text
    }

    constructor( public items: NavmenuItem[] = [] ) {
        this.selectedItem = items[0]
    }

    async render() {
        let index = 0;

        for ( let item of this.items ) {
            const formatter = index === this.selectedIndex 
                ? this.selectedMenuItemFormatter 
                : this.menuItemFormatter
            
            const formattedText = formatter.call(this, item)
            console.log( formattedText )
            index++;
        }
        
        const key = await keypress()
        if ( key.name === 'down' ) {
            if ( this.selectedIndex < this.items.length - 1 ) this.selectedIndex++
        }
        else if ( key.name === 'up' ) {
            if ( this.selectedIndex > 0 ) this.selectedIndex--
            else if ( this.selectedIndex == -1 ) this.selectedIndex = this.items.length - 1
        }
        else if ( key.name === 'return' ) {
            return this.items[this.selectedIndex]
        }
        return this.rerender()
    }


    async run() {
        return await this.render()
    }

    async rerender() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const pos = await getCursorPosition()
        readline.cursorTo(process.stdout, 0, pos.rows - 3 - 1)
        return await this.render()
    }

    
}


