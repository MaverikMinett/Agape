import { TestSuite } from "./test-suite"

/**
 * Root, base, starting suite that the describe and it 
 * functions add tests too
 */
let root: TestSuite = new TestSuite('TestSuite')

/**
 * Stack of open suites. Push and pop suites to the stack
 * to open and close the currently active/open suite.
 */
let stack: TestSuite[] = [ root ]

/**
 * Get the test suite which is currently open
 * @returns The currently open test suite
 */
export function activeTestSuite() {
    return stack.length ? stack[stack.length-1] : undefined
}

/**
 * Open a test suite. Newly created tests and suites will become
 * part of the currently open suite.
 * @param suite 
 */
export function openSuite( suite: TestSuite ) {
  stack.push( suite )
}

/**
 * Close the currently open test suite. The parent suite will become
 * the currently open suite.
 */
export function closeSuite() {
  stack.pop()
}

/**
 * Create a new root test suite. Start fresh.
 */
export function clearSuite(){
    root = new TestSuite('TestSuite')
    stack = [ root ]
}

/**
 * Access the root test suite
 * @returns The root test suite
 */
export function rootSuite() {
  return root
}