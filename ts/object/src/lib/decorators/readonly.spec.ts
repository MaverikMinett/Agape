import {} from "jasmine"
import { meta } from "../meta";
import { readonly } from "./readonly"
import { property } from "./property"
import { lazy } from "./lazy";

let o:any;
describe('readonly decorator', () => {

    afterEach( () => {
        o = undefined;
    })

    it('should declare the property', () => {
        class SimpleObject  { 
            @readonly
            foo: Number
        }

        expect( SimpleObject.prototype.hasOwnProperty('foo') ).toBeTrue()
    })

    it('should have the readonly indicator', () => {
        class SimpleObject  { 
            @readonly
            foo: Number
        }

        let p:any = SimpleObject.prototype

        expect( p.Δmeta.property('foo').ʘreadonly ).toBeTrue()
    })

    it('should be readonly', () => {
        class SimpleObject  { 
            @readonly
            foo: Number
        }

        o = new SimpleObject()
        expect( o.Δmeta.property('foo').ʘreadonly ).toBeTrue()
        expect( function(){ o.foo = 32  }).toThrowError()
    })

    it('should be readonly and have a default value', () => {
        class SimpleObject  { 
            @readonly @lazy(32)
            foo: Number
        }

        o = new SimpleObject()
        expect( o.foo ).toBe(32)
        expect( function(){ o.foo = 45  }).toThrowError()
    })

    it('should be used inside a trait', () => {
        class SimpleObject  { 
            @readonly @lazy(32)
            foo: Number
        }

        o = new SimpleObject()
        expect( o.foo ).toBe(32)
        expect( function(){ o.foo = 45  }).toThrowError()
    })

    it('should be used inside a trait', () => {
        class SimpleTrait  { 
            @readonly @lazy(32)
            foo: Number
        }

        class SimpleObject {}
        meta(SimpleObject).include(SimpleTrait)


        o = new SimpleObject()
        expect( o.foo ).toBe(32)
        expect( function(){ o.foo = 45  }).toThrowError()
    })
})