import readline from 'readline';
import { getCursorPosition } from './cursor';

export abstract class CliControl {

    stdin  = process.stdin

    stdout = process.stdout 

    rl = readline.createInterface(this.stdin)

    nLines:number = 0

    active: boolean = false
    rendered: boolean = false

    abstract awaitUserInput(): Promise<any>
    abstract drawControl(): Promise<void>

    async run() {
        this.rendered = false
        this.active = true
        const response = await this.render()
        this.active = false
        
        /* don't provide finish, and don't force the user to have it */
        /* just call it if it's there */
        const $this: any = this
        if ( $this.finish ) await $this.finish()

        return response
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
        }

    }
}