// import { TestCase } from "./test-case"

export class TestSuite {

    suites: TestSuite[] = []

    tests: TestCase[] = []

    focus: boolean 

    skip: boolean

    result: 'pass'|'fail'|'skip'

    status: 'waiting'|'ran'|'skipped' = 'waiting'

    runningTest: TestCase

    parent: TestSuite

    constructor( public description: string ) {

    }

    async run() {
        /* skip the suite */
        if ( this.skip ) {
            this.result = 'skip'
            this.status = 'skipped'
            return
        }
        for ( let test of this.tests ) {
            await test.run()
        }
        for ( let suite of this.suites ) {
            await suite.run()
        }
        this.status = 'ran'
    }

    addTest( testCase: TestCase ) {
        this.tests.push(testCase)
    }

    addSuite( suite: TestSuite ) {
        this.suites.push(suite)
    }

    describe(description: string ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to describe, nested inside call to it '${this.runningTest.description}'`)
        }

        const suite = new TestSuite(description)
        suite.parent = this
        this.addSuite(suite)
        return suite
    }

    it(description: string, test: Function, params?: TestCaseParams ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to it, nested inside other call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test, params)
        testCase.suite = this
        this.addTest(testCase)
    }

    fit(description: string, test: Function, params?: TestCaseParams) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test, params)
        testCase.suite = this
        testCase.focus = true
        this.addTest(testCase)
    }

    xit(description: string, test: Function, params?: TestCaseParams) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to xit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test, params)
        testCase.suite = this
        testCase.skip = true
        this.addTest(testCase)
    }
}


export interface TestCaseParams {
    focus?: boolean;
    skip?: boolean;
    interactive?: boolean;
    instructions?: string;
}

/**
 * 
 */
export class TestCase {

    focus: boolean 

    skip: boolean

    result: 'pass'|'fail'|'skip'

    status: 'waiting'|'ran'|'skipped' = 'waiting'

    suite: TestSuite

    instructions: string
    interactive: boolean


    constructor( 
        public description: string,
        public test: Function, 
        params?: TestCaseParams ) {
        if (params ) Object.assign(this,params)
    }

    async run( ) {
        /* skip the test */
        if ( this.skip ) {
            this.result = 'skip'
            this.status = 'skipped'
            return
        }

        const interactive = this.interactive
        if ( interactive ) await this.printInteractiveBeforeTestBlurb()

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

        if ( interactive ) await this.printInteractiveAfterTestBlurb()
    }

    async printInteractiveBeforeTestBlurb() {
        console.log("· " + this.getFormattedTestName() )
    }

    // å
    async printInteractiveAfterTestBlurb() {
        console.log(this.result)
    }

    private getFormattedTestName() {
        return this.getTestNameParts().join(" ▸ ")
    }

    private getTestNameParts() {
        let suite = this.suite;
        let descriptions = [ suite.description ]
        while ( suite.parent ) {
            suite = suite.parent
            descriptions.unshift(suite.description)
        }
        descriptions.push(this.description)
        descriptions.shift()
        return descriptions
    }
}