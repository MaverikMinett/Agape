import { activeTestSuite, closeSuite, openSuite } from "./private"
import { TestSuite } from "./test-suite"

describe('suite stack', () => {
    describe('openSuite', () => {
        it('should open the suite', () => {
            const s = new TestSuite('FooBar')
            expect(activeTestSuite() !== s).toBe(true)
            openSuite(s)
            expect(activeTestSuite() === s).toBe(true)
            closeSuite()
        })
    })
    describe('closeSuite', () => {
        it('should close the suite', () => {
            const s = new TestSuite('FooBar')
            openSuite(s)
            closeSuite()
            expect(activeTestSuite() !== s).toBe(true)
        })
    })
    describe('activeSuite', () => {
        it('should have the root suite as the active suite', () => {
            expect(activeTestSuite() !== undefined).toBe(true)
        })
        it('should maintain the correct active suite', () => {
            const s1 = new TestSuite('FooBar')
            const s2 = new TestSuite('FooBar')
            openSuite(s1)
            expect(activeTestSuite()).toBe(s1)
            openSuite(s2) 
            expect(activeTestSuite()).toBe(s2)
            closeSuite()
            expect(activeTestSuite()).toBe(s1)
            closeSuite()
            expect(activeTestSuite() !== s1).toBe(true)
        })
    })
})