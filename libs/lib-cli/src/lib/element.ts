
import readline from 'readline';
import { getCursorPosition } from './cursor';

export class CliElement {

    stdin  = process.stdin

    stdout = process.stdout 

    rl = readline.createInterface(this.stdin)

    nLines:number = 0

    active: boolean = false
    rendered: boolean = false
    
    async drawControl(): Promise<void> { }

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
        
        await this.drawControl()

        this.rendered = true

        // if the element is interactive (has the awaitUserInput method)
        // then wait for user input
        if ( (this as any).awaitUserInput ) {
            const userInput = await (this as any).awaitUserInput()

            if ( userInput !== undefined ) return userInput
    
            else return this.render()
        }

        // otherwise we are done here
    }

    async clearRenderedControl() {

        const pos = await getCursorPosition()
        process.stdout.write("\r\x1b[K")

        for ( let n = 1; n <= this.nLines; n++ ) {
            readline.cursorTo(process.stdout, 0, pos.row - n)
            process.stdout.write("\r\x1b[K")
        }

    }
}