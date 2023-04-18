import { Expect } from "./expect"
import { activeTestSuite, closeSuite, openSuite, rootSuite } from "./private" 
import { Spy } from "./spy";
import { TestCaseParams, TestSuiteParams } from "./interfaces"

export { rootSuite } from './private';


function describeArgsToParams( ...args: any[] ): [ string, boolean, Function, TestSuiteParams ] {
    let interactiveOption: boolean
    const description: string = args[0]
    let suiteBuilder: Function
    let params: TestSuiteParams
    if ( args[1] === 'interactive' ) {
        interactiveOption = true
        suiteBuilder = args[2]
        params = args[2]
    }
    else {
        suiteBuilder = args[1]
        params = args[2]
    }
    return [ description, interactiveOption, suiteBuilder, params ]
}

/**
 * Create a test suite and add it to the currently open suite
 * @param description Description for the suite
 * @param suiteBuilder Function to build the suite
 */
export function describe( description: string, suiteBuilder: ( ...args: any[] ) => void ): void
export function describe( description: string, interactive: 'interactive', suiteBuilder: ( ...args: any[] ) => void ): void
export function describe( description: string, suiteBuilder: ( ...args: any[] ) => void, params: TestSuiteParams ): void
export function describe( ...args:any[] ): void {
    const [ description, interactiveOption, suiteBuilder, params ] = describeArgsToParams(...args)
    const suite = activeTestSuite().describe( description, params )
    if ( interactiveOption ) suite.interactive = true
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

/**
 * Focus on the test suite
 * @param description 
 * @param suiteBuilder 
 */
export function fdescribe( description: string, suiteBuilder: ( ...args: any[] ) => void ): void
export function fdescribe( description: string, interactive: 'interactive', suiteBuilder: ( ...args: any[] ) => void ): void
export function fdescribe( description: string, suiteBuilder: ( ...args: any[] ) => void, params: TestSuiteParams ): void
export function fdescribe( ...args:any[] ): void {
    const [ description, interactiveOption, suiteBuilder, params ] = describeArgsToParams(...args)
    const suite = activeTestSuite().fdescribe( description, params )
    if ( interactiveOption ) suite.interactive = true
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

/**
 * Skip the test suite
 * @param description 
 * @param suiteBuilder 
 */
export function xdescribe( description: string, suiteBuilder: ( ...args: any[] ) => void ): void
export function xdescribe( description: string, interactive: 'interactive', suiteBuilder: ( ...args: any[] ) => void ): void
export function xdescribe( description: string, suiteBuilder: ( ...args: any[] ) => void, params: TestSuiteParams ): void
export function xdescribe( ...args:any[] ): void {
    const [ description, interactiveOption, suiteBuilder, params ] = describeArgsToParams(...args)
    const suite = activeTestSuite().xdescribe( description, params )
    if ( interactiveOption ) suite.interactive = true
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

/**
 * Create a test and add it to the currently open test suite
 * @param description Description for the test
 * @param test Function composing the test
 */
export function it( description, test: Function)
export function it( description, test: Function, params: TestCaseParams )
export function it( description, test: Function, params?: TestCaseParams ) {
    activeTestSuite().it(description, test, params)
}

/**
 * Focus on the test
 * @param description 
 * @param test 
 */
export function fit( description, test: Function)
export function fit( description, test: Function, params: TestCaseParams )
export function fit( description, test: Function, params?: TestCaseParams  ) {
    activeTestSuite().fit(description, test, params)
}

/**
 * Skip the test
 * @param description 
 * @param test 
 */
export function xit( description, test: Function)
export function xit( description, test: Function, params: TestCaseParams )
export function xit( description, test: Function, params?: TestCaseParams  ) {
    activeTestSuite().xit(description, test, params)
}

/**
 * Run all tests in the root suite
 * @returns 
 */
export async function runtests() {
    console.log("Starting demo test runner")
    return rootSuite().run()
}

/**
 * Create an expect statement
 * @param actual The value to assess
 * @returns 
 */
export function expect<T>( actual: T ) {
    return new Expect<T>( actual )
}

/**
 * Spy on an object method
 * @param object Object to spy on
 * @param method Method to spy on
 * @returns Spy
 */
export function spyOn( object:any, method: string ) {

    const spy = new Spy()
    const original = object[method]

    function spyMethod (...args: any[] ) {
        const $: any = spyMethod
        $.spy.calls.push({ args: args})
        if ( $.spy.callThrough ) original.call(this, ...args)
    }

    object[method] = spyMethod
    object[method].spy = spy
    
    return spy
}