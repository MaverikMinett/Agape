import { CliControl } from "../control";
import { keypress, KeypressEvent } from "../keypress";

import chalk from 'chalk';


class ClinInputControlParameters {
    required: boolean;
}

export class CliInputControl extends CliControl {

    value: string = ""

    label: string = ""

    required: boolean = false

    protected message: string
    protected cursorPosition: number = 0

    constructor( label?: string, params?: ClinInputControlParameters  ) {
        super()
        this.label = label;
        if ( params ) Object.assign( this, params )
    }

    async drawControl() {
        const labelText = this.label !== undefined && this.label !== null
            ? `${this.label} ` 
            : ''

        const formattedLabel = chalk.gray(labelText)

        if ( this.message  ) {
            process.stdout.write(formattedLabel + this.message )
        }
        else {
            process.stdout.write(formattedLabel + this.value )
        }

    }

    async clearMessage() {
        this.message = "";
    }


    async awaitUserInput() {

        const key = await keypress()
        this.clearMessage()

        if ( key.name == 'left' ) {
            this.cursorPosition--
            // if ( this.cursorPosition < 0 ) this.cursorPosition = 0
            // return undefined
        }
        else if ( key.name == 'right' ) {
            this.cursorPosition++
            // if ( this.cursorPosition > this.value.length ) this.value.length
            // return undefined
        }
        else if ( key.name == 'down' ) {
            return undefined
        }
        else if ( key.name == 'up' ) {
            return undefined
        }
        else if ( key.name == 'return' ) {
            if ( this.required && this.value == '') {
                this.message = chalk.red('Required')
            }
            else {
                return this.value
            }
        }
        else if ( key.name === 'backspace' ) {
            this.inputBackspace(this.cursorPosition)
            return undefined
        }
        else if ( key.name === 'delete' ) {
            this.inputDelete(this.cursorPosition)
        }
        else {
            this.inputKeypress(key, this.cursorPosition)
        }
     }

    finish() {
        console.log("")
    }

    protected inputKeypress( key: KeypressEvent, position: number ) {
        const symbol = key.sequence;

        /* if at the end of the input, just append the symbol to the end of the value */
        if ( position == this.value.length ) {
            this.value += symbol
        }

        /* otherwise insert the character in the string */
        else {
            const before = this.value.substring(0,position)
            const after  = this.value.substring(position)
            
            console.log("\nValue", this.value )
            console.log("Before", before)
            console.log("After", after)
            console.log("symbol", symbol)
            console.log("Position", position)
            this.value = `${before}${symbol}${after}`
            console.log("New value", this.value)
        }

        // console.log(`Inserted character at ${position}`)
        
        this.cursorPosition++
    }

    protected inputBackspace( position: number ) {
        /* if at the end of the input, just remove the last character */
        if ( position == this.value.length ) {
            this.value == this.value.substring(0,this.value.length-1)
            this.cursorPosition--
        }
        /* if at the beginning of the input, do nothing */
        else if ( position === 0 ) {
            return
        }
        /* if within in the input, remove the specified character */
        else {
            const before = this.value.substring(0,position-1)
            const after  = this.value.substring(position)
            this.value = `${before}${after}`
            this.cursorPosition--
        }
    }

    protected inputDelete( position: number ) {
        /* if at the end of the input, do nothing */
        if ( position == this.value.length ) {
            return
        }
        /* if within in the input, remove the specified character */
        else {
            const before = this.value.substring(0,position)
            const after  = this.value.substring(position+1)
            this.value = `${before}${after}`
        }
    }

}






    // keyMask = ( key: KeypressEvent ) => {
    //     if ( key.sequence.startsWith('\\') ) {
    //         return false
    //     }
    //     return true
    // }




// export class CliInputControl extends CliControl {

//     label: string = ""

//     value: string = ""

//     constructor( ) {
//         super()
//         this.nLines = 0
//     }

//     async drawControl() {
//         this.stdout.write("Draw control " + this.value )

//     }

//     async awaitUserInput() {


//         const key = await keypress()


//         // delete characters from value when user presses backspace
//         if ( key.name === 'backspace' ) {
//             this.value = this.value.substring(0, this.value.length - 1)
//         }
//         // return the final value when user presses enter
//         else if ( key.name === 'return' ) {
//             return this.value
//         }
//         // don't let the user move up
//         else if ( key.name === 'up' ) {
//             // remove the cursor
//             // process.stdout.write("\x1B[?25l")

//             // show the cursors
//             // process.stdout.write("\x1B[?25l")
//             // process.stdout.write("\x1B[?25h")

//             // move the cursors to colum 7
//             // process.stdout.write('\x1B[?7H')
//             // process.stdout.write('\u001b[25l')
//             // const pos = await getCursorPosition()
//             // process.stdout.write('\a')
//             // console.log(pos)
//             // readline.cursorTo(process.stdout, pos.col, pos.row + 1)
//             // await setCursorPosition({ row: pos.row + 1, col: pos.col })
//         }
//         // ignore terminal control characters
//         if ( key.sequence.startsWith('\\') ) {
//             return undefined
//         }


        

//         // only allow user permitted characters
//         // else if ( this.keyMask.call(this,key) === false ) {
//         //     return this.value
//         // }
//         // add the character to the input value
//         else  {
//             this.value += key.sequence;
//         }
//         return undefined
//     }

//     async finish() {
//         console.log("")
//     }
    
// }






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