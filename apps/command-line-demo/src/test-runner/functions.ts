import { activeTestSuite, closeSuite, openSuite } from "./private" 


export function describe( description: string, suiteBuilder: Function ) {
    const suite = activeTestSuite().describe( description )
    openSuite(suite)
    suiteBuilder.call(undefined)
    closeSuite()
}

export function it( description, test: Function ) {
    activeTestSuite().it(description, test)
}

export function fit( descirption, test: Function ) {
    activeTestSuite().fit(descirption, test)
}

export function xit( descirption, test: Function ) {
    activeTestSuite().xit(descirption, test)
}

export function runtests() {
    activeTestSuite().run()
}