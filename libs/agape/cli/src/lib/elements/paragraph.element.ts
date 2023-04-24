import { getTerminalSize } from "@agape/terminal"
import { CliElement } from "../element"



export interface CliParagraphParams {
    text?: string;
    width?: number;
    maxWidth?: number;
}

/**
 * Print a block of text formatted to the width of the terminal window
 */
export class CliParagraphElement extends CliElement {

    text: string = ""

    constructor( text?: string, params? ) {
        super()
        if ( text !== undefined ) {
            this.text = text
        }
    }

    async run() {
        const width = getTerminalSize().columns

        const lines = []
        let currentLine = '';

        for ( let word of this.text.split(/\s+/) ) {
            // start a new line if the addition of this word will overflow the width
            if ( currentLine.length + word.length + 1 > width ) {
                lines.push(currentLine)
                currentLine = ''
            }
            // add a space to the end of the line if the line already has words on it
            if ( currentLine.length != 0 ) {
                currentLine += ' '
            }
            // add the word to the line
            currentLine += word
        }
        lines.push( currentLine )


       for ( let line of lines ) {
         console.log(line)
       }
    }

}