
import { TestRunner } from './test-runner'
import { TestSuite } from './test-suite'


describe('TestRunner', () => {

    
    let r: TestRunner
    let s: TestSuite

    beforeEach( () => {
        r = undefined
    })

    it('should instantiate', async () => {
        r = new TestRunner()
        expect(r).toBeInstanceOf(TestRunner)
    })


})

