
import { strict as assert } from 'node:assert';

export class Expect<T> {


    constructor( protected actual: T ) {

    }

    toBe( expected: any ) {
        assert.equal(this.actual, expected)
    }

    toEqual( expected: any ) {
        assert.deepEqual(this.actual, expected)
    }

    toBeTruthy() {
        assert.ok(this.actual)
    }

    toBeFalsy() {
        assert.ok(!this.actual)
    }

    toHaveBeenCalled() {
        const spy = (this.actual as any)?.spy
        if ( ! spy ) throw new Error("Expected a spy")
        assert.ok(spy.calls.length > 0)
    }

    toHaveBeenCalledTimes( n: number ) {
        const spy = (this.actual as any)?.spy
        if ( ! spy ) throw new Error("Expected a spy")
        assert.ok(spy.calls.length >= n)
    }
}