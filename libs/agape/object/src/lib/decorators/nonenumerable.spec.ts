

import { lazy } from './lazy'
import { property } from './property'
import { readonly } from './readonly'
import { nonenumerable } from './nonenumerable'




let o;
describe('nonenumerable decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should enumerate a property', () => {

        class SimpleObject { 

            @property('bar')  foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBe(true)
    })


    it('should have enumerable declaration set to false in the meta data', () => {

        class SimpleObject { 

            @nonenumerable  foo: string

        }

        let p: any = SimpleObject.prototype

        expect(  p.Δmeta.properties.has('foo') ).toBe(true)
        expect(  p.Δmeta.properties.get('foo')['ʘenumerable']).toBe(false)

    })

    it('should not appear in a for .. in loop', () => {

        class SimpleObject { 

            @nonenumerable foo: string

        }

        o = new SimpleObject()
        o.foo = 'bar'

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBe(false)
        expect( inheritedEnumerables.includes('ʘfoo') ).toBe(false)
    })

    it('should work with the property decorator', () => {

        class SimpleObject { 

            @nonenumerable @property('bar') foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBe(false)
        expect( inheritedEnumerables.includes('ʘfoo') ).toBe(false)
    })

    it('should work with the readonly decorator', () => {

        class SimpleObject { 

            @nonenumerable @readonly @property('bar') foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBe(false)
        expect( inheritedEnumerables.includes('ʘfoo') ).toBe(false)

        expect( () => { o.foo = "baz" }).toThrowError()
    })

    it('should work with the lazy decorator', () => {

        /* as it stands, the lazy and property decorators do the same thing,
           so this test is redundant, it is anticipated that the behaviors for
           lazy and property will diverge, this test is place to ensure everthying
           continues to function if/when that happens */

        class SimpleObject { 

            @nonenumerable @lazy('bar') foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBe(false)
        expect( inheritedEnumerables.includes('ʘfoo') ).toBe(false)
    })
})