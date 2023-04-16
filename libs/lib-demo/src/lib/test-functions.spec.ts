
import { describe as myDescribe, tr } from "./test-runner";

describe('describe', () => {
    it('should be a function', () => {
        expect(myDescribe).toBeInstanceOf(Function)
    })
    it('should create a test suite', () => {
        myDescribe('FooBar', () => { })
        expect(tr.suiteStack.length).toBe(1)
    })
})