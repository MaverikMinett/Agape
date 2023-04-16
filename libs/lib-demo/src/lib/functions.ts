import { Expect } from "./expect"
import { activeTestSuite, closeSuite, openSuite, rootSuite } from "./private" 


export function describe( description: string, suiteBuilder: Function ) {
    const suite = activeTestSuite().describe( description )
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

export function it( description, test: Function ) {
    activeTestSuite().it(description, test)
}

export function fit( description, test: Function ) {
    activeTestSuite().fit(description, test)
}

export function xit( description, test: Function ) {
    activeTestSuite().xit(description, test)
}

export async function runtests() {
    return rootSuite().run()
}

export function expect<T>( actual: T ) {
    return new Expect<T>( actual )
}