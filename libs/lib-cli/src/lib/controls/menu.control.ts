
import { keypress } from '../keypress';
import { CliElement } from '../element';
import { hideCursor, showCursor } from '../cursor';

export type CliMenuParams = Partial<Pick<CliMenuControl, keyof CliMenuControl>>

export interface CliMenuItem {
    key?: string
    label: string;
}

export class CliMenuControl extends CliElement {

    indicator: string = "❯"

    selectedIndex: number = 0

    selectedItem: CliMenuItem

    menuItemFormatter = (item) => {
        const text =  "  " + item.label
        return text
    }

    selectedMenuItemFormatter = (item) => {

        const indicator =  item.indicator ?? this.indicator
        const indicatorFormatted = "\x1b[38;2;0;255;255m" + indicator + "\x1b[0m"
        const label = "\x1b[38;2;0;255;255m" + "\x1b[4m" + item.label + "\x1b[0m"

        const text =  indicatorFormatted + " " + label
        return text
    }

    constructor( public items: CliMenuItem[] = [], params?: CliMenuParams  ) {
        super()
        Object.assign(this, params)
        this.selectedItem = items[0]
        this.nLines = items.length
    }

    // async before() {
    //     hideCursor()
    // }

    async drawElement() {
        await hideCursor()
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
            if ( this.selectedIndex >= 0 ) return this.items[this.selectedIndex]
        }
        return undefined
    }
    
    async finish() {
        await showCursor()
    }
}


