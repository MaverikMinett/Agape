import { meta } from '../meta'
import { include } from "./include";
import { lazy } from "./lazy";
import { stack } from './stack'



let o;
describe('stack decorator', () => {

    afterEach( () => {
        o = undefined;
    })


    it('should have the declaration in the meta data', () => {

        class SimpleTrait { 

            @stack
            foo() { }

        }
        let p: any = SimpleTrait.prototype

        expect(  p.Δmeta.methods.has('foo') ).toBe(true)
        expect(  p.Δmeta.methods.get('foo')['ʘstack'] ).toBeTruthy()

    })


    it('should add the stack method modifier to the class meta data', () => {

        class SimpleTrait { 

            @stack
            foo() { }

        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject {

        }

         meta(SimpleObject).include(SimpleTrait)

         let p: any = SimpleObject.prototype

        expect( p.Δmeta.methods.get('foo').stack ).toBeTruthy()

    })


    it('should call run stack', () => {
        class SimpleTrait { 

            stack: number

            @stack
            foo() {
                this.stack = this.stack || 0
                this.stack += 1
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

        
        o = new SimpleObject()
        o.foo()
        expect( o.stack ).toEqual(1)
    })



    it('should call all stacked methods', () => {
        class SimpleTrait { 

            stack: number

            @stack
            foo() {
                this.stack = this.stack || 0
                this.stack += 1
            }
        }

        class AnotherTrait { 

            stack: number

            @stack foo() {
                this.stack = this.stack || 0
                this.stack += 10
            }
        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject {

            bar: boolean

            foo() {
                this.bar = true
            }

         }

         meta(SimpleObject).include(SimpleTrait, AnotherTrait)

        
        o = new SimpleObject()
        o.foo()
        expect( o.stack ).toEqual(11)
    })


	it('removes the default method implementation', () => {
		class ATrait {

			@lazy(0)
			calls:number

			@stack
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