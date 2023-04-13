import readline from 'readline';
import { getCursorPosition } from './cursor';

export abstract class CliControl {

    stdin  = process.stdin

    stdout = process.stdout 

    nLines:number = 0

    rendered: boolean = false

    abstract awaitUserInput(): Promise<any>
    abstract drawControl(): Promise<void>

    async run() {
        this.rendered = false
        return await this.render()
    }

    protected async render() {

        if ( this.rendered ) await this.clearRenderedControl()
        
        this.drawControl()

        this.rendered = true

        const userInput = await this.awaitUserInput()

        if ( userInput ) return userInput

        else return this.render()
    }

    async clearRenderedControl() {

        const pos = await getCursorPosition()
        process.stdout.write("\r\x1b[K")

        for ( let n = 1; n < this.nLines; n++ ) {
            readline.cursorTo(process.stdout, 0, pos.row - 1)
            process.stdout.write("\r\x1b[K")
            readline.cursorTo(process.stdout, 0, pos.row - 2)
            process.stdout.write("\r\x1b[K")
            readline.cursorTo(process.stdout, 0, pos.row - 3)
            process.stdout.write("\r\x1b[K")
        }




        
    }
}