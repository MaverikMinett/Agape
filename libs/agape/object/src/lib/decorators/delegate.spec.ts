

import { delegate } from './delegate'
import { readonly } from './readonly'
import { lazy } from './lazy'



let o;
describe('delegate decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should delegate to a property to a simple object', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @delegate( a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should set a value on a delegated property', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @delegate( a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')

        o.foo = 'biz'
        expect(a.foo).toEqual('biz')
    })

    it('should delegate to a property of a different name', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @delegate( a, 'foo' )  
            bar: string
        }

        o = new SimpleObject()

        expect(o.bar).toEqual('baz')

    })

    it('should delegate to a property to a simple object using a callback', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @delegate( o => a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')

    })


    it('should delegate a property to that of a lazily instantied object', () => {

        class AObject {
            foo: string = 'baz'
        }

        class BObject { 

            @delegate( o => o.bar )  
            foo: string

            @lazy( o => new AObject() )
            bar: string


        }

        o = new BObject()

        expect(o.foo).toEqual('baz')
        expect(o.bar.foo).toEqual('baz')

    })

    it('should delegate and be readonly', () => {

        class AObject {
            foo: string = 'baz'
        }

        class BObject { 

            @readonly @delegate( o => o.bar )  
            foo: string

            @lazy( o => new AObject() )
            bar: string
        }

        o = new BObject()

        expect(o.foo).toEqual('baz')
        expect(() => { o.foo = 'biz'}).toThrowError()

    })

})