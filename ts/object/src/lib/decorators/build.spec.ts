import {} from "jasmine"

import { build } from './build'
import { readonly } from './readonly'
import { lazy } from './lazy'
import { include } from "./include";
import { Buildable } from "../traits/buildable";
import { meta } from "../meta";
import { PropertyDescriptor } from "../descriptors";



let o;
describe('build decorator', () => {

    beforeEach( () => {
        o = undefined;
    })

    it('should build a property', () => {

        @include( Buildable )
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

        @include( Buildable )
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

        @include( Buildable )
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

        @include( Buildable )
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



    describe('building', () => {
        it('should add the property to the build property', () => {
            @include( Buildable )
            class SimpleObject { 
                @build
                foo: string
    
                _build_foo() {
                    return 'baz'
                }
            }
    
            o = new SimpleObject()
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect( meta(SimpleObject).buildProperties[0].name ).toBe('foo')
        })


        it('should @build with an anonymous builder function', () => {
            @include( Buildable )
            class SimpleObject { 
                @build( o => "baz" )
                foo: string
            }
    
            spyOn( meta(SimpleObject), 'performBuild' ).and.callThrough()
            o = new SimpleObject()
            
            expect( meta(SimpleObject).performBuild ).toHaveBeenCalled()
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect(o.foo).toEqual('baz')
        })

        it('should @build with a method name', () => {
            @include( Buildable )
            class SimpleObject { 
                @build( "foo_builder" )
                foo: string

                foo_builder() {
                    return "bar"
                }
            }
    
            spyOn( meta(SimpleObject).target, 'foo_builder' ).and.callThrough()
            o = new SimpleObject()
            
            expect( meta(SimpleObject).target.foo_builder ).toHaveBeenCalled()
            expect(o.foo).toEqual('bar')
        })

        it('should @build trait properties', () => {

            class ATrait {
                @build
                foo: string

                _build_foo() {
                    return "bar"
                }
            }

            @include( Buildable )
            @include( ATrait )
            class SimpleObject {  }
    
            expect( meta(SimpleObject).buildProperties.length ).toBe(1)
            expect( meta(SimpleObject).buildProperties[0] ).toBeInstanceOf(PropertyDescriptor)
            o = new SimpleObject()
            expect(o.foo).toEqual('bar')
        })
    })

})