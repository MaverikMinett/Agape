
import { keypress, hideCursor, showCursor } from '@agape/terminal';
import { CliElement } from '../element';
import { Menu } from '@lib/menu';


export type CliMenuParams = Partial<Pick<CliMenuControl, keyof CliMenuControl>>

export interface CliMenuItem {
    label: string;
}

export class CliMenuControl extends CliElement {

    indicator: string = "❯"

    // selectedIndex: number = 0

    // selectedItem: CliMenuItem

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

    // constructor( public items: CliMenuItem[] = [], params?: CliMenuParams  ) {
    constructor( public menu: Menu, params?: CliMenuParams ) {
        super()
        Object.assign(this, params)
        menu.selectedIndex = 0
        this.nLines = menu.items.length
    }

    // async before() {
    //     hideCursor()
    // }

    async drawElement() {
        await hideCursor()
        let index = 0;
        for ( let item of this.menu.items ) {
            const formatter = index === this.menu.selectedIndex 
                ? this.selectedMenuItemFormatter 
                : this.menuItemFormatter
            
            const formattedText = formatter.call(this, item)
            console.log( formattedText )
            index++;
        }
        await showCursor()
    }

    async awaitUserInput() {
        const menu = this.menu;

        const key = await keypress()
        if ( key.name === 'down' ) {
            if ( menu.selectedIndex < menu.items.length - 1 ) menu.selectedIndex++
        }
        else if ( key.name === 'up' ) {
            if ( menu.selectedIndex > 0 ) menu.selectedIndex--
            else if ( menu.selectedIndex == -1 ) menu.selectedIndex = menu.items.length - 1
        }
        else if ( key.name === 'return' ) {
            if ( menu.selectedIndex >= 0 ) return menu.items[menu.selectedIndex]
        }
        return undefined
    }
    
    async finish() {
        await showCursor()
    }
}


