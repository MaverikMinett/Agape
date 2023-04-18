

export interface SpyMethodCall {
   args: any[]
}

export class Spy {

    calls: SpyMethodCall[] = []

    callThrough: boolean = false

    /**
     * True if spy has been called any times
     * @returns Boolean
     */
    hasBeenCalled(): boolean {
        return this.calls.length > 0
    }
}

