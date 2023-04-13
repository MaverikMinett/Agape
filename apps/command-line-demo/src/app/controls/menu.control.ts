import chalk from 'chalk';
import readline from 'readline';
import { keypress, getCursorPosition, CursorPosition } from '@lib/cli';

export interface CliMenuItem {
    key?: string
    label: string;
}


export class CliMenuControl {

    selectedIndex: number = -1

    selectedItem: CliMenuItem

    menuItemFormatter = (item) => {
        const text =  "  " + item.label
        return text
    }

    selectedMenuItemFormatter = (item) => {
        const text =  chalk.cyan("❯") + " " + chalk.underline.cyan(item.label)
        return text
    }

    constructor( public items: CliMenuItem[] = [] ) {
        this.selectedItem = items[0]
    }

    async render() {
        this.drawComponent()
        
        const userInput = await this.awaitUserInput()

        if ( userInput ) return userInput

        else return this.rerender()
    }

    async run() {
        return await this.render()
    }

    async drawComponent() {
        let index = 0;
        for ( let item of this.items ) {
            const formatter = index === this.selectedIndex 
                ? this.selectedMenuItemFormatter 
                : this.menuItemFormatter
            
            const formattedText = formatter.call(this, item)
            console.log( formattedText )
            index++;
        }
    }

    async awaitUserInput() {
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
    }

    async rerender() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const pos = await getCursorPosition()
        readline.cursorTo(process.stdout, 0, pos.row - this.items.length)
        return await this.render()
    }

    
}