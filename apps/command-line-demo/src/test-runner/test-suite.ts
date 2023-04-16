import { TestCase } from "./test-case"

export class TestSuite {

    suites: TestSuite[] = []

    tests: TestCase[] = []

    focus: boolean 

    skip: boolean

    result: 'pass'|'fail'|'skip'

    status: 'waiting'|'ran'|'skipped' = 'waiting'

    runningTest: TestCase

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
        this.addSuite(suite)
        return suite
    }

    it(description: string, test: Function ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to it, nested inside other call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        this.addTest(testCase)
    }

    fit(description: string, test: Function) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        testCase.focus = true
        this.addTest(testCase)
    }

    xit(description: string, test: Function) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to xit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        testCase.skip = true
        this.addTest(testCase)
    }
}

