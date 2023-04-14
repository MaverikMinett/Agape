import { CliControl } from "../control";
import { keypress, KeypressEvent } from "../keypress";
import { getCursorPosition } from "../cursor";
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

    protected controlCoordinates: { col: number, row: number } = { col: 0, row: 0 }

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

        // console.log(formattedLabel)

        const coordinates = await getCursorPosition()

        // console.log( coordinates)

        if ( this.message  ) {
            process.stdout.write(formattedLabel + this.message )
        }
        else {
            process.stdout.write(formattedLabel + this.value )
        }

        
        // this.drawCursor()
    }


    // async drawCursor() {
    //     this.stdout.write('\u001b[1;1H')
    // }


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
            await this.inputBackspace(this.cursorPosition)
            return undefined
        }
        else if ( key.name === 'delete' ) {
            await this.inputDelete(this.cursorPosition)
            return undefined
        }
        else {
            await this.inputKeypress(key, this.cursorPosition)
            return undefined
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
            this.value = `${before}${symbol}${after}`
        }

        // console.log(`Inserted character at ${position}`)
        
        this.cursorPosition++
    }

    protected async inputBackspace( position: number ) {
        /* if at the beginning of the input, do nothing */
        if ( position === 0 ) {
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

    protected async inputDelete( position: number ) {
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

