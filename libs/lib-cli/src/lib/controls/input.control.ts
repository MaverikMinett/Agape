import { CliControl } from "../control";
import { getCursorPosition, setCursorPosition } from "../cursor";

import { keypress, KeypressEvent } from "../keypress";

import readline from 'readline';
import chalk from 'chalk';



export class CliInputControl extends CliControl {

    value: string = ""

    async drawControl() {
        process.stdout.write("Question>>> " + this.value )
    }


    async awaitUserInput() {
        let userResponded = false
        let userResponse: string
        while( userResponded === false ) {
            const key = await keypress()
            if ( key.name == 'down' ) {
                await this.clearRenderedControl()
                await this.drawControl()
            }
            else if ( key.name == 'up' ) {
                await this.clearRenderedControl()
                await this.drawControl()
            }
            else if ( key.name == 'return' ) {
                userResponded = true
                userResponse = this.value
            }
            else if ( key.name === 'backspace' ) {
                this.value = this.value.substring(0,this.value.length-1)
                await this.clearRenderedControl()
                await this.drawControl()
            }
            else {
                this.value += key.sequence
                await this.clearRenderedControl()
                await this.drawControl()
            }
        }

        if ( userResponded ) return this.value
        else return undefined
     }


    finish() {
        console.log("")
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