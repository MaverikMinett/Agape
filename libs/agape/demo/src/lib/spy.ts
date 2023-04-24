

export interface SpyMethodCall {
   args: any[]
}

export class Spy {

    calls: SpyMethodCall[] = []

    callThrough: boolean = false

    original: (...args: any[]) => any

    constructor( 
        public object?: object,
        public method?: string ) {
        if ( object && method ) this.original = object[method]
    }

    /**
     * Call the spy. Will call original method and return value
     * if `callThrough` is true.
     * @param args Arguments passed into the function/method
     * @returns Void or return value of original function
     */
    call( ...args: any[] ) {
        this.calls.push({ args })
        if ( this.callThrough ) return this.original.call(this.object,...args)
    }

    /**
     * True if spy has been called any times
     * @returns Boolean
     */
    hasBeenCalled(): boolean {
        return this.calls.length > 0
    }
}

