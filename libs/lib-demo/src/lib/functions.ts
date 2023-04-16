import { Expect } from "./expect"
import { activeTestSuite, closeSuite, openSuite, rootSuite } from "./private" 
import { TestCaseParams } from "./test-suite"

export function describe( description: string, suiteBuilder: Function ) {
    const suite = activeTestSuite().describe( description )
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

export function it( description, test: Function, params?: TestCaseParams ) {
    activeTestSuite().it(description, test, params)
}

export function fit( description, test: Function, params?: TestCaseParams  ) {
    activeTestSuite().fit(description, test, params)
}

export function xit( description, test: Function, params?: TestCaseParams  ) {
    activeTestSuite().xit(description, test, params)
}

export async function runtests() {
    console.log("Starting demo test runner....")
    return rootSuite().run()
}

export function expect<T>( actual: T ) {
    return new Expect<T>( actual )
}