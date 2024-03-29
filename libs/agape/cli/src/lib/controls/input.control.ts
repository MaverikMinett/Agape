import { keypress, KeypressEvent } from "@agape/terminal";
import { CursorPosition, getCursorPosition, setCursorPosition } from "@agape/terminal";
import { CliElement } from "../element";

class ClinInputControlParameters {
    required?: boolean;
    value?: string;
    cursorPosition?: number;
}

/**
 * Control to accept user input
 */
export class CliInputControl extends CliElement {

    value: string = ""

    label: string = ""

    required: boolean = false

    cursorPosition: number = 0

    protected message: string
    
    protected controlCoordinates: { col: number, row: number } = { col: 0, row: 0 }

    protected absoluteCursorCoordinates: { col: number, row: number } = { col: 0, row: 0 }

    constructor( label?: string, params?: ClinInputControlParameters  ) {
        super()
        this.label = label;
        if ( params ) Object.assign( this, params )

        /* set initial cursor position */
        if ( params?.cursorPosition ) {
            this.cursorPosition = params.cursorPosition
        }
        else if ( this.value ) {
            this.cursorPosition = this.value.length
        }
    }

    /**
     * Draw element
     */
    async drawElement() {

        const labelText = this.label !== undefined && this.label !== null
            ? `${this.label} ` 
            : ''

        const formattedLabel = "\x1b[90m" + labelText + "\x1b[0m" // gray labels

        if ( this.message  ) {
            process.stdout.write(formattedLabel + this.message )
        }
        else {
            process.stdout.write(formattedLabel + this.value )
        }

        this.controlCoordinates = await this.determineInputCoordinates(labelText)

        this.absoluteCursorCoordinates = await this.determineAbsoluteCursorCoordinates( this.controlCoordinates, this.cursorPosition )

        this.drawCursor( this.absoluteCursorCoordinates )
    }

    /**
     * Await user input
     * @returns 
     */
    async awaitUserInput() {

        const key = await keypress()

        this.clearMessage()

        if ( key.name == 'left' ) {
            this.cursorPosition--
            if ( this.cursorPosition < 0 ) this.cursorPosition = 0
            return undefined
        }
        else if ( key.name == 'right' ) {
            this.cursorPosition++
            if ( this.cursorPosition > this.value.length ) this.value.length
            return undefined
        }
        else if ( key.name == 'down' ) {
            return undefined
        }
        else if ( key.name == 'up' ) {
            return undefined
        }
        else if ( key.name == 'return' ) {
            if ( this.required && this.value == '') {
                this.message = "\x1b[31m" + "Required" + "\x1b[0m"
                return undefined
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

    /**
     * Adds a new line after the text input so that subsequent elements start
     * on a new line.
     */
    finish() {
        console.log("")
    }

    private async determineInputCoordinates( predicate: string ) {
        const cursorCoordinates = await getCursorPosition()
        const row = cursorCoordinates.row
        const col = predicate.length 
        return { row, col }
    }

    private async determineAbsoluteCursorCoordinates( controlCoordinates: CursorPosition, controlCursorPosition: number ) {
        const col = controlCoordinates.col + controlCursorPosition
        return { row: controlCoordinates.row, col }
    }

    protected async drawCursor( position: CursorPosition ) {
        setCursorPosition( position )
    }


    protected async clearMessage() {
        this.message = "";
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

