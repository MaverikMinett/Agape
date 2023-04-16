

import { TestCase } from './test-case'


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


})