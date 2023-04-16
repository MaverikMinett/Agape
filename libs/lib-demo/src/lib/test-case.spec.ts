

import { TestCase, TestSuite } from './test-suite'


describe('TestCase', () => {

    let tc:TestCase

    beforeEach( () => {
        tc = undefined
    })

    it('should instantiate', async () => {
        tc = new TestCase('should run', () => {
            true;
        })

        expect(tc).toBeInstanceOf(TestCase)
    })


    describe('run', () => {
        it('should run the test', async () => {
            tc = new TestCase('should run', () => {
                true;
            })
    
            await tc.run()
            expect(tc.status).toBe('ran')
        })
        it('should pass the test', async () => {
            tc = new TestCase('should run', () => {
                true;
            })
    
            await tc.run()
            expect(tc.result).toBe('pass')
        })
        it('should fail the test', async () => {
            tc = new TestCase('should run', () => {
                throw new Error("this does not equal that")
            })
    
            await tc.run()
            expect(tc.result).toBe('fail')
        })

        it('should skip the test', async () => {
            tc = new TestCase('should run', () => {
                throw new Error("this does not equal that")
            })
            tc.skip = true
    
            await tc.run()
            expect(tc.status).toBe('skipped')
            expect(tc.result).toBe('skip')
        })
    })

    describe('interactive', () => {
        it('should inherit from parent suite', () => {
            const ts = new TestSuite('Test suite', {interactive: true})
            ts.it('a test', () => true )
            expect(ts.tests[0].interactive).toBe(true)
        })
        it('should inherit from parent suite (undefined)', () => {
            const ts = new TestSuite('Test suite')
            ts.it('a test', () => true )
            expect(ts.tests[0].interactive).toBe(undefined)
        })
    })

})