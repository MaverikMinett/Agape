
import { TestRunner } from './test-runner'


describe('TestRunner', () => {

    
    let tr = new TestRunner()

    beforeEach( () => {
        tr = undefined
    })

    it('should instantiate', async () => {
        tr = new TestRunner()
        expect(tr).toBeInstanceOf(TestRunner)
    })


})

