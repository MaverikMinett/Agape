
import { TestRunner } from './test-runner'


describe('TestRunner', () => {

    
    let r: TestRunner

    beforeEach( () => {
        r = undefined
    })

    it('should instantiate', async () => {
        r = new TestRunner()
        expect(r).toBeInstanceOf(TestRunner)
    })


})

