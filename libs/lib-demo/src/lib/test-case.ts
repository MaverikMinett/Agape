
/**
 * 
 */
export class TestCase {

    focus: boolean 

    skip: boolean

    result: 'pass'|'fail'|'skip'

    status: 'waiting'|'ran'|'skipped' = 'waiting'

    constructor( public description: string, public test: Function ) {

    }

    async run( ) {
        /* skip the test */
        if ( this.skip ) {
            this.result = 'skip'
            this.status = 'skipped'
            return
        }

        const interactive = true
        

        /* run the test */
        try {
            await this.test()
            this.result = 'pass'
        }
        catch (error) {
            this.result = 'fail'
        }
        finally {
            this.status = 'ran'
        }
    }

    async printInteractiveTestScreen() {
        console.log("Interactive Test")
        console.log(this.description)
    }

}