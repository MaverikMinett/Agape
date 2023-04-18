

export interface SpyMethodCall {
   args: any[]
}

export class Spy {

    calls: SpyMethodCall[] = []

    callThrough: boolean = false

    hasBeenCalled() {
        return this.calls.length > 0
    }
}

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