import { CliControl } from "../control";

import { keypress } from "../keypress";
import chalk from 'chalk'
import { CliMenuItem } from "./menu.control";


export class CliInputControl extends CliControl {

    selectedIndex: number = -1

    selectedItem: CliMenuItem

    value: string = ""

    menuItemFormatter = (item) => {
        const text =  "  " + item.label
        return text
    }

    selectedMenuItemFormatter = (item) => {
        const text =  chalk.cyan("❯") + " " + chalk.underline.cyan(item.label)
        return text
    }

    constructor( public items: CliMenuItem[] = [] ) {
        super()
        this.selectedItem = items[0]
        this.nLines = items.length
    }

    async drawControl() {
        this.stdout.write("Draw control " + this.value )

    }

    async awaitUserInput() {
        const key = await keypress()

        if ( key.name === 'backspace' ) {
            this.value = this.value.substring(0, this.value.length - 1)
        }
        else if ( key.sequence.startsWith('\\') ) {
            return undefined
        }
        else if ( key.name === 'return' ) {
            return this.value
        }
        else  {
            this.value += key.sequence;
        }
        return undefined
    }

    async finish() {
        console.log("")
    }
    
}






// export class CliInputControl extends CliControl {

//     label: string

//     name: string

//     value: string


//     constructor( name?: string, label?: string ) {
//         super()
//         this.name = name
//         this.label = label
//     }

//     async awaitUserInput(): Promise<any> {
//         // await keypress()
//         let userResponded = false
//         let userResponse: string = ""
//         while( userResponded === false ) {
//             const key = await keypress()
            
//             if ( key.name === 'return' ) userResponded = true
//             else { userResponse += key.name }
//             this.value = userResponse
//         }
//         // if (userResponse === undefined) userResponse = ""
//         return userResponse
//     }

//     i = 0;

//     async drawControl(): Promise<void> {
//         console.log("Drawing control")
//         const prefixChar = this.active ? '❯' : '·'
//         const label = this.label !== undefined && this.label !== null 
//             ? this.label
//             : ''

//         const outputPrefix = `${prefixChar} ${label}`
//         const inputFieldColumnStart = outputPrefix.length + 2

//         console.log(this.value)

//         const outputvalue = this.value !== undefined && this.value !== null 
//             ? this.value
//             : ''

//         console.log(`${outputPrefix} ${outputvalue}-${this.i++}`)   
//     }

// }