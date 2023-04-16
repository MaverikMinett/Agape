import { TestSuite } from './test-suite'
import { TestCase  } from './test-case'

describe('TestSuite', () => {
    let s:TestSuite

    beforeEach( () => {
        s = undefined
    })

    it('should instantiate', async () => {
        s = new TestSuite('FooBar')
        expect(s).toBeInstanceOf(TestSuite)
    })

    describe('addTest', () => {
        it('should add the test to the suite', () => {
            s = new TestSuite('FooBar')
            const c = new TestCase('should be true', () => true )
            expect(s.tests.length).toBe(0)
            s.addTest(c)
            expect(s.tests.length).toBe(1)
            expect(s.tests[0]).toBe(c)
        })
    })

    describe('addSuite', () => {
        it('should add a suite to a suite', () => {
            const s1 = new TestSuite('FooBar')
            const s2 = new TestSuite('FooBar')
            expect(s1.suites.length).toBe(0)
            s1.addSuite(s2)
            expect(s1.suites.length).toBe(1)
            expect(s1.suites[0]).toBe(s2)
        })
    })

    describe('describe', () => {
        it('should create a new suite', () => {
            s = new TestSuite('FooClass')
            const suite = s.describe('fooMethod')
            expect(s.suites.length).toBe(1)
            expect(s.suites[s.suites.length -1]).toBe(suite)
        })
        it('should return the newly created test suite', () => {
            s = new TestSuite('FooClass')
            const suite = s.describe('fooMethod')
            expect(suite).toBeInstanceOf(TestSuite)
        })

    })

    describe('it', () => {
        it('should create a new test', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.it('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1]).toBeInstanceOf(TestCase)
            expect(s.tests[s.tests.length-1].description).toBe('should do a thing')
            expect(s.tests[s.tests.length-1].test).toBe(t)
        })
        it('should create a test without focus', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.it('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].focus).toBeFalsy()
        })
        it('should create a test without skip', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.it('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].skip).toBeFalsy()
        })
    })

    describe('xit', () => {
        it('should create a new test', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.xit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1]).toBeInstanceOf(TestCase)
            expect(s.tests[s.tests.length-1].description).toBe('should do a thing')
            expect(s.tests[s.tests.length-1].test).toBe(t)
        })
        it('should create a test without focus', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.xit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].focus).toBeFalsy()
        })
        it('should create a test with skip', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.xit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].skip).toBe(true)
        })
    })

    describe('fit', () => {
        it('should create a new test', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.fit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1]).toBeInstanceOf(TestCase)
            expect(s.tests[s.tests.length-1].description).toBe('should do a thing')
            expect(s.tests[s.tests.length-1].test).toBe(t)
        })
        it('should create a test with focus', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.fit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].focus).toBe(true)
        })
        it('should create a test without skip', () => {
            const t = () => true
            s = new TestSuite('FooClass')
            s.fit('should do a thing', t )
            expect(s.tests.length).toBe(1)
            expect(s.tests[s.tests.length-1].skip).toBeFalsy()
        })
    })
})

