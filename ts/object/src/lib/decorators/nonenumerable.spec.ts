import {} from "jasmine"

import { lazy } from './lazy'
import { property } from './property'
import { readonly } from './readonly'
import { nonenumerable } from './nonenumerable'
import { build } from "./build"
import { include } from "./include"
import { Buildable } from "../traits/buildable"
import { meta } from "../meta"




let o;
describe('nonenumerable decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should enumerate a property', () => {

        class SimpleObject { 

            @lazy('bar')  foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBeTrue()
    })


    it('should have enumerable declaration set to false in the meta data', () => {

        class SimpleObject { 

            @nonenumerable  foo: string

        }

        let p: any = SimpleObject.prototype

        expect(  p.Δmeta.properties.has('foo') ).toBeTrue()
        expect(  p.Δmeta.properties.get('foo')['ʘenumerable']).toBeFalse()

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

        expect( inheritedEnumerables.includes('foo') ).toBeFalse()
        expect( inheritedEnumerables.includes('ʘfoo') ).toBeFalse()
    })

    it('should work with the build decorator', () => {

        @include( Buildable )
        class SimpleObject { 

            @nonenumerable @build(o => 'bar') foo: string

        }

        o = new SimpleObject()

        expect(o.foo).toEqual('bar')
        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }

        expect( inheritedEnumerables.includes('foo') ).toBeFalse()
        expect( inheritedEnumerables.includes('ʘfoo') ).toBeFalse()
    })

    it('should work with the readonly decorator', () => {

        @include( Buildable )
        class SimpleObject {
            @nonenumerable @readonly @build( o => "42" ) foo: string
        }

        o = new SimpleObject()
        expect(o.foo).toEqual('42')
        expect( meta(SimpleObject).property('foo').ʘreadonly ).toBeTrue()


        
        let inheritedEnumerables = []
        for ( let field in o ) { inheritedEnumerables.push(field) }
        expect( inheritedEnumerables.includes('foo') ).toBeFalse()
        expect( inheritedEnumerables.includes('ʘfoo') ).toBeFalse()
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

        expect( inheritedEnumerables.includes('foo') ).toBeFalse()
        expect( inheritedEnumerables.includes('ʘfoo') ).toBeFalse()
    })
})