import { getTerminalSize } from '@agape/terminal'
import { TestCaseParams, TestSuiteParams } from "./interfaces"

export class TestSuite {

    suites: TestSuite[] = []

    tests: TestCase[] = []

    focus: boolean
    
    skip: boolean

    result: 'pass'|'fail'|'skip'

    status: 'waiting'|'ran'|'skipped' = 'waiting'

    runningTest: TestCase

    parent: TestSuite

    /* inherit interactive state from parent suite if not explicitly set */
    private _interactive: boolean

    get interactive() {
        return this._interactive ?? this.parent?.interactive
    }

    set interactive(value: boolean) {
        this._interactive = value
    }


    constructor( public description: string, params?: TestSuiteParams ) {
        if ( params ) Object.assign(this, params)
    }

    /**
     * Run the test suite
     * @returns 
     */
    async run() {
        /* skip the suite */
        if ( this.skip && ! this.hasFocusTest()) {
            this.result = 'skip'
            this.status = 'skipped'

            /* skip this suite, but still run any tests with focus enabled */
            for ( let test of this.tests.filter( test => test.focus === true ) ) {
                await test.run()
            }
            for ( let suite of this.suites.filter( suite => suite.hasFocusTest() === true) ) {
                await suite.run()
            }
            return
        }

        /* a test in the suite has focus enabled */
        else if ( this.hasFocusTest() && ! this.focus ) {
            for ( let test of this.tests.filter( test => test.focus === true ) ) {
                await test.run()
            }
            for ( let suite of this.suites.filter( suite => suite.hasFocusTest() === true) ) {
                await suite.run()
            }
        }

        else {
            for ( let test of this.tests ) {
                await test.run()
            }
            for ( let suite of this.suites ) {
                await suite.run()
            }
        }


        this.status = 'ran'
    }

    /**
     * Add test to the suite
     * @param testCase 
     */
    addTest( testCase: TestCase ) {
        this.tests.push(testCase)
    }

    /**
     * Add child suite to the suite
     * @param suite 
     */
    addSuite( suite: TestSuite ) {
        this.suites.push(suite)
    }

    /**
     * If the suite or any member of the suite has focus enabled
     * @returns 
     */
    hasFocusTest() {
        return !! ( 
                    this.focus
                    || this.tests.find( test => test.focus ) 
                    || this.suites.find( suite => suite.focus || suite.hasFocusTest() ) 
                )
    }

    /**
     * Create a new child suite and add it to the suite
     * @param description 
     * @param params 
     * @returns 
     */
    describe(description: string, params?: TestSuiteParams ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to describe, nested inside call to it '${this.runningTest.description}'`)
        }
        const suite = new TestSuite(description, params)
        suite.parent = this
        this.addSuite(suite)
        return suite
    }

    /**
     * Focus on a new child suite
     * @param description 
     * @param params 
     * @returns 
     */
    fdescribe(description: string, params?: TestSuiteParams ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fdescribe, nested inside call to it '${this.runningTest.description}'`)
        }
        const suite = new TestSuite(description, params)
        suite.parent = this
        suite.focus = true
        this.addSuite(suite)
        return suite
    }

    /**
     * Skip a new child suite
     * @param description 
     * @param params 
     * @returns 
     */
    xdescribe(description: string, params?: TestSuiteParams ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fdescribe, nested inside call to it '${this.runningTest.description}'`)
        }
        const suite = new TestSuite(description, params)
        suite.parent = this
        suite.skip = true
        this.addSuite(suite)
        return suite
    }

    /**
     * Create a new test and add it to the suite
     * @param description 
     * @param test 
     * @param params 
     */
    it(description: string, test: Function, params?: TestCaseParams ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to it, nested inside other call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test, params)
        testCase.suite = this
        this.addTest(testCase)
    }

    /**
     * Focus on a new test
     * @param description 
     * @param test 
     * @param params 
     */
    fit(description: string, test: Function, params?: TestCaseParams) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test, params)
        testCase.suite = this
        testCase.focus = true
        this.addTest(testCase)
    }

    /**
     * Skip a new test
     * @param description 
     * @param test 
     * @param params 
     */
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


    /* inherit interactive state from parent suite if not explicitly set */
    private _interactive: boolean

    get interactive() {
        return this._interactive ?? this.suite?.interactive
    }

    set interactive(value: boolean) {
        this._interactive = value
    }

    constructor( 
        public description: string,
        public test: Function, 
        params?: TestCaseParams ) {
        if (params ) Object.assign(this,params)
    }

    /**
     * Run the test, pausing for user interaction if interactive
     * @returns 
     */
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

    /**
     * Print test information before interactive tests to alert the user
     */
    private async printInteractiveBeforeTestBlurb() {
        let hr = ''
        const size = getTerminalSize().columns
        for ( let i = 0; i < size; i++ ) { hr += '—' }

        console.log( "\x1b[38;5;27m" + hr + "\x1b[0m" )
        console.log("\x1b[38;5;227m▸\x1b[0m " + this.getFormattedTestName() )
    }

    /**
     * Print a pass/fail message after an interactive test to alert the user
     */
    private async printInteractiveAfterTestBlurb() {
        let color: string
        let endColor = "\x1b[0m"
        let bold = "\x1b[1m"
        switch (this.result) {
            case 'fail':
                color = "\x1b[48;2;192;54;101m"
                break
            case 'pass':
                color = "\x1b[48;2;127;187;82m"
                break
            case 'skip':
                color = "\x1b[48;2;229;187;0m"
                break
        }

        const resultFormatted = color + bold + ' ' + this.result.toUpperCase() + ' ' + endColor

        console.log(resultFormatted, "\n")
    }

    /**
     * Format the test name with symbols and colors
     * @returns Formatted test name
     */
    private getFormattedTestName() {
        return this.getTestNameParts()
            .map( description => `\x1b[38;5;27m${description}\x1b[0m` )
            .join(" \x1b[38;5;227m▸\x1b[0m ")
    }

    /**
     * Get the fully qualified test name
     * @returns 
     */
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