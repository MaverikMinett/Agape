
import { strict as assert } from 'node:assert';

export class Expect<T> {


    constructor( public actual: T ) {

    }

    toBe( expected: any ) {
        assert.equal(this.actual, expected)
    }

    toEqual( expected: any ) {
        assert.deepEqual(this.actual, expected)
    }


}