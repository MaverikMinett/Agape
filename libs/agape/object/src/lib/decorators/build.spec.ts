

import { build } from './build'
import { readonly } from './readonly'
import { lazy } from './lazy'



let o;
describe('build decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should build a property', () => {

        class SimpleObject { 
            @build 
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should build a property using a custom method name', () => {

        class SimpleObject { 
            @build('_build_bar')
            foo: string

            _build_bar() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })


    it('should work with read only', () => {

        class SimpleObject { 
            @readonly @build
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })

    it('should work with lazy', () => {

        class SimpleObject { 
            @lazy @build
            foo: string

            _build_foo() {
                return 'baz'
            }
        }

        o = new SimpleObject()

        expect(o.foo).toEqual('baz')
    })
})