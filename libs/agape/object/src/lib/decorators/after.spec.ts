
import { meta } from '../meta'

import { after } from './after'
import { include } from "./include";
import { lazy } from "./lazy";


let o;
describe('after decorator', () => {

    afterEach( () => {
        o = undefined;
    })


    it('should have the declaration in the meta data', () => {

        class SimpleTrait  { 
            @after foo() { }

        }

        let p: any = SimpleTrait.prototype

        expect(  p.Δmeta.methods.has('foo') ).toBe(true)
        expect(  p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()

    })


    it('should add the after method modifier to the class meta data', () => {

        class SimpleTrait  { 

            @after foo() { }

        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject  {

        }

        meta(SimpleObject).include(SimpleTrait)

        let p: any = SimpleTrait.prototype
        let q: any = SimpleObject.prototype

        expect( p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
        expect( q.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()

    })


    it('should call the after modifier', () => {
        class SimpleTrait  { 

            bar: boolean
            after: boolean

            @after
            foo() {
                this.after = true
            }
        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject {

            bar: boolean

            foo() {
                this.bar = true
            }

         }

         meta(SimpleObject).include(SimpleTrait)

         let p: any = SimpleTrait.prototype
         let q: any = SimpleObject.prototype

         expect( p.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
         expect( q.Δmeta.methods.get('foo')['ʘafter'][0] ).toBeTruthy()
        //  expect(meta(SimpleObject).methods.has('foo')).toBe(true)
        //  expect(meta(SimpleObject).methods.has('foo')['ʘafter']).toBeTruthy()
        
        o = new SimpleObject()
        o.foo()
        expect( o.bar ).toBe(true)
        expect( o.after ).toBe(true)
    })

    it('should run multiple before modifiers', () => {
        class ATrait { 

            count: number

            @after
            foo() {
                this.count || ( this.count = 0 )
                this.count += 1
            }
        }

        class BTrait { 

            count: number

            @after
            foo() {
                this.count || ( this.count = 0 )
                this.count += 1
            }
        }


        interface SimpleObject extends ATrait, BTrait {};

        class SimpleObject  {


            foo() {}

         }

         meta(SimpleObject).include(ATrait,BTrait)

        
        o = new SimpleObject()
        o.foo()
        expect( o.count ).toEqual(2)
    })
	it('removes the default method implementation', () => {
		class ATrait {

			@lazy(0)
			calls:number

			@after
			init() {
				this.calls++
			}

		}

		interface AClass extends ATrait { };
		@include( ATrait )
		class AClass {

		}

		const o = new AClass()
		o.init()
		expect( o.calls ).toBe(1)

		expect( meta(AClass).method('init').ʘdefault ).toBeUndefined()
	})
})