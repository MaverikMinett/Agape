import { TestCase } from "./test-case"
import { TestSuite } from "./test-suite"


export class TestRunner {

    runningTest: TestCase

    root: TestSuite = new TestSuite('TestSuite')

    suiteStack: TestSuite[] = [ this.root ]

    get openSuite() {
        return this.suiteStack[ this.suiteStack.length - 1]
    }

    describe(description: string, suiteBuilder: Function ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to describe, nested inside call to it '${this.runningTest.description}'`)
        }

        const suite = new TestSuite(description)
        this.openSuite.suites.push(suite)
        this.suiteStack.push(suite)
        suiteBuilder()
        this.suiteStack.pop()
    }
    it(description: string, test: Function ) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to it, nested inside other call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        this.openSuite.addTest(testCase)
    }
    fit(description: string, test: Function) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to fit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        testCase.focus = true
        this.openSuite.addTest(testCase)
    }
    xit(description: string, test: Function) {
        if ( this.runningTest ) {
            throw new Error(`Invalid call to xit, nested inside call to it '${this.runningTest.description}'`)
        }
        const testCase = new TestCase(description, test)
        testCase.skip = true
        this.openSuite.addTest(testCase)
    }

    async run() {
        const suite = this.suiteStack[0]
        return suite.run()
    }
}


export const tr = new TestRunner();

export function describe( description: string, suite: Function ) {
    tr.describe( description, suite )
}

export function it( description, test: Function ) {
    tr.it(description, test)
}

export function fit( descirption, test: Function ) {
    tr.fit(descirption, test)
}

export function xit( descirption, test: Function ) {
    tr.xit(descirption, test)
}

export function runtests() {
    tr.run()
}