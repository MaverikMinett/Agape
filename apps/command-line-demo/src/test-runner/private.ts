import { TestSuite } from "./test-suite"


let root: TestSuite = new TestSuite('TestSuite')

let stack: TestSuite[] = [ root ]

export function activeTestSuite() {
    return stack.length ? stack[stack.length-1] : undefined
}

export function openSuite( suite: TestSuite ) {
  stack.push( suite )
}

export function closeSuite() {
  stack.pop()
}

export function clearSuite(){
    root = new TestSuite('TestSuite')
    stack = [ root ]
}
