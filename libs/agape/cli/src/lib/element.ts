
import readline from 'readline';
import { getCursorPosition } from '@agape/terminal';

export class CliElement {

    stdin  = process.stdin

    stdout = process.stdout 

    rl = readline.createInterface(this.stdin)

    nLines:number = 0

    active: boolean = false
    rendered: boolean = false
    
    protected async drawElement(): Promise<void> { }

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

    // async draw( ) {
    //     if ( this.rendered ) await this.clearRenderedElement()
        
    //     await this.drawElement()

    //     this.rendered = true

    //     /* don't provide finish, and don't force the user to have it */
    //     /* just call it if it's there */
    //     const $this: any = this
    //     if ( $this.finish ) await $this.finish()
    // }

    protected async render() {

        if ( this.rendered ) await this.clearRenderedElement()
        
        await this.drawElement()

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

    protected async clearRenderedElement() {

        const pos = await getCursorPosition()
        process.stdout.write("\r\x1b[K")

        for ( let n = 1; n <= this.nLines; n++ ) {
            readline.cursorTo(process.stdout, 0, pos.row - n)
            process.stdout.write("\r\x1b[K")
        }

    }

    /**
     * Run after the element completes (to add new lines after a single
     * line input elements). Only implement if needed.
     */
     // finish() { }
}