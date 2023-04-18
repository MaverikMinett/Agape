import * as fnc from './functions'
import { activeTestSuite, clearSuite } from './private'
import { Spy } from './spy'

describe('describe', () => {

    beforeEach( () => {
        clearSuite()
    })

    it('should call describe on the active test suite', () => {
        fnc.describe('FooBar', () => {
            fnc.it('should create a test', () => {

            })
        })
        expect( activeTestSuite().suites.length ).toBe(1)
        expect( activeTestSuite().suites[0].tests.length ).toBe(1)
    })
    
    it('should call describe with the interactive keyword', () => {
        fnc.describe('FooBar', 'interactive', () => {
            fnc.it('should create a test', () => {

            })
        })
    })

    describe('fit', () => {
        it('should add a test with the focus property set', () => {
            fnc.describe('FooBar', 'interactive', () => {
                fnc.fit('biz baz', () => {
    
                })
            })
            const root = fnc.rootSuite()
            const suite = root.suites[0]
            expect(suite.tests.length).toBe(1)
            
            const test = suite.tests[0]
            expect(test.focus).toBe(true)
        })
        it('thasFocusTest() should return true on the suite', () => {
            fnc.describe('FooBar', 'interactive', () => {
                fnc.fit('biz baz', () => {
    
                })
            })
            const root = fnc.rootSuite()
            const suite = root.suites[0]
            expect(suite.hasFocusTest()).toBe(true)
        })
        it('thasFocusTest() should return true on the root suite', () => {
            fnc.describe('FooBar', 'interactive', () => {
                fnc.fit('biz baz', () => {
    
                })
            })
            const root = fnc.rootSuite()
            expect(fnc.rootSuite().hasFocusTest()).toBe(true)
        })
        it('should run the focused test', () => {
            fnc.describe('FooBar', 'interactive', () => {
                fnc.fit('biz baz', () => {
    
                })
            })
            const root  = fnc.rootSuite()
            const suite = root.suites[0]
            const test  = suite.tests[0]

            jest.spyOn(test, 'run')
            suite.run()
            expect(test.run).toHaveBeenCalled()
        })
        it('should not run the non focused test', () => {
            fnc.describe('FooBar', 'interactive', () => {
                fnc.fit('biz baz', () => {
    
                })
                fnc.it('boz boz', () => {
    
                })
            })
            const root  = fnc.rootSuite()
            const suite = root.suites[0]
            const test  = suite.tests[0]
            const ctrl  = suite.tests[1]

            jest.spyOn(test, 'run')
            jest.spyOn(ctrl, 'run')
            suite.run()
            expect(test.run).toHaveBeenCalled()
            expect(ctrl.run).toHaveBeenCalledTimes(0)
        })
    })

 
})

describe('expect', () => {
    it('should create and return a new Expect object', () => {
        fnc.expect(true).toBe(true)
    })
})

describe('spyOn', () => {

    let target = { foo: () => null }
    beforeEach( () => {
        target = { foo: () => null }
    })

    it('should be a function ', () => {
        expect(spyOn).toBeInstanceOf(Function)
    })
    it('should create a spy', () => {
        const spy = fnc.spyOn(target, 'foo')
        expect(spy).toBeInstanceOf(Spy)
    })
    it('should replace the original method', () => {
        const original = target.foo
        const spy = fnc.spyOn(target, 'foo')
        expect(target.foo !== original).toBe(true)
    })
    it('the spy method should have the spy object', () => {
        const spy = fnc.spyOn(target, 'foo')
        expect( (target.foo as any).spy ).toBe(spy)
    })
    it('should track calls and args', () => {
        const spy = fnc.spyOn(target, 'foo')
        target.foo()
        expect( spy.calls.length ).toBe(1)
    })
})