
import { inherit } from './inherit'
import { readonly } from './readonly'
import { lazy } from './lazy'



let o;
describe('inherit decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should inherit from a property on a simple object', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @inherit( a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should over-ride the value on itself', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @inherit( a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')

        o.foo = 'biz'
        expect(o.foo).toEqual('biz')
        expect(a.foo).toEqual('baz')
    })

    it('should inherit from a property of a different name', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @inherit( a, 'foo' )  
            bar: string
        }

        o = new SimpleObject()

        expect(o.bar).toEqual('baz')

    })

    it('should inherit a property from an object using a callback', () => {

        let a = { 'foo': 'baz' }

        class SimpleObject { 
            @inherit( o => a )  
            foo: string
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')

    })


    it('should inherit a property from of a lazily instantied object', () => {

        class AObject {
            foo: string = 'baz'
        }

        class BObject { 

            @inherit( o => o.bar )  
            foo: string

            @lazy( o => new AObject() )
            bar: string
        }

        o = new BObject()

        expect(o.foo).toEqual('baz')
        expect(o.bar.foo).toEqual('baz')

    })

    it('should inherit and be readonly', () => {

        class AObject {
            foo: string = 'baz'
        }

        class BObject { 

            @readonly @inherit( o => o.bar )  
            foo: string

            @lazy( o => new AObject() )
            bar: string
        }

        o = new BObject()

        expect(o.foo).toEqual('baz')
        expect(() => { o.foo = 'biz'}).toThrowError()

    })

})