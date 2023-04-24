
import { strict as assert } from 'node:assert';

export class Expect<T> {


    constructor( protected actual: T ) {

    }

    /**
     * Test for absolute equality (is exact same object)
     * @param expected The expected value
     */
    toBe( expected: any ) {
        assert.equal(this.actual, expected)
    }

    /**
     * Deep equality test, check that arrays or pojos are equivalent
     * @param expected The expected value
     */
    toEqual( expected: any ) {
        assert.deepEqual(this.actual, expected)
    }

    /**
     * Is the value not false, 0, empty string, undefined, or null
     */
    toBeTruthy() {
        assert.ok(this.actual)
    }

    /**
     * Is the value false, 0, empty string, undefined, or null
     */
    toBeFalsy() {
        assert.ok(!this.actual)
    }

    /**
     * Is the value of a specific type
     * @param expected The expected class type for the value
     */
    toBeInstanceOf( expected: { new(...args:any[]): any } ) {
        assert.ok(this.actual instanceof expected)
    }

    /**
     * Has the spy been called
     */
    toHaveBeenCalled() {
        const spy = (this.actual as any)?.spy
        if ( ! spy ) throw new Error("Expected a spy")
        assert.ok(spy.calls.length > 0)
    }

    /**
     * Has the spy been called n number of times
     * @param n Number of times
     */
    toHaveBeenCalledTimes( n: number ) {
        const spy = (this.actual as any)?.spy
        if ( ! spy ) throw new Error("Expected a spy")
        assert.ok(spy.calls.length >= n)
    }
}