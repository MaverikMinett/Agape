
import { meta } from "../meta";
import { Class } from "../types";

import { include } from './include'


let o;
describe('include decorator', () => {

    beforeEach( () => {
        o = undefined;
    })


    it('should add the trait to ordinary class', () => {

        class SimpleTrait  { }

        interface SimpleClass extends SimpleTrait {}

        @include( SimpleTrait )
        class SimpleClass { }

        o = new SimpleClass()
        expect( o ).toBeTruthy()

        let hasTrait = () => { 
            for ( let element of meta(SimpleClass)['traits'] ) {
                if ( SimpleTrait == element ) return true;
            }
        }

        expect( hasTrait() ).toBeTruthy()
    })

    it('should add a method to an ordinary class', () => {

        class SimpleTrait { 

            called: boolean

            foo() {
                this.called = true
            }

        }

        interface SimpleClass extends SimpleTrait {}

        @include( SimpleTrait )
        class SimpleClass { }

        o = new SimpleClass()
        o.foo()
        expect( o.called ).toBe(true)
    })

    it('should allow traits to "decorate" the class', () => {

        class ATrait {
            Δdecorate( target:Class ) {
                return class extends target {
                    constructor( ...args ) {
                        super(...args)
                        this.calls = ( this.calls ?? 0 ) + 1
                    }   
                }
            }
        }

        @include( ATrait )
        class AClass {

            calls: number

            constructor() {
                this.calls = ( this.calls ?? 0 ) + 1
            }
        }

        let o = new AClass()
        expect( o.calls ).toBe(2)
    })

    it('should execute the Δinclude method on the trait', () => {
        class ATrait {
            Δinclude( target, trait ) {
                target['ʘfoo'] = trait['ʘfoo']
            }
        }
        ATrait.prototype['ʘfoo'] = true

        @include( ATrait )
        class AClass {

        }

        let o = new AClass()
        expect( ATrait.prototype['ʘfoo'] ).toBe(true)
    })

})