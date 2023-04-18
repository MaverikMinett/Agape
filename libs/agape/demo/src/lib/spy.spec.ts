

import { Spy, spyOn } from './spy'


describe('Spy', () => {
    
    let s: Spy
    
    beforeEach( () => {
        s = undefined
    })
    it('should instantiate', () => {
        s = new Spy()
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
        const spy = spyOn(target, 'foo')
        expect(spy).toBeInstanceOf(Spy)
    })
    it('should replace the original method', () => {
        const original = target.foo
        const spy = spyOn(target, 'foo')
        expect(target.foo !== original).toBe(true)
    })
    it('the spy method should have the spy object', () => {
        const spy = spyOn(target, 'foo')
        expect( (target.foo as any).spy ).toBe(spy)
    })
    it('should track calls and args', () => {
        const spy = spyOn(target, 'foo')
        target.foo()
        expect( spy.calls.length ).toBe(1)
    })
})