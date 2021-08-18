import {} from "jasmine"
import { meta } from '../meta'
import { before } from './before'



let o:any
describe('before decorator', () => {

    beforeEach( () => {
        o = undefined;
    })


    it('should have before declaration in the meta data', () => {

        class TraitWithDecorator { 

            @before
            foo() { }

        }

        let p: any = TraitWithDecorator.prototype

        expect(  p.Δmeta.methods.has('foo') ).toBeTrue()
        expect(  p.Δmeta.methods.get('foo')['ʘbefore'][0] ).toBeTruthy()

    })


    it('should add the before method modifier to the class meta data', () => {

        class SimpleTrait { 

            @before
            foo() { }

        }

        interface SimpleObject extends SimpleTrait {};

        class SimpleObject  {}

        meta(SimpleObject).include(SimpleTrait)

        let p: any = SimpleObject.prototype
        expect(  p.Δmeta.methods.has('foo') ).toBeTrue()
        expect(  p.Δmeta.methods.get('foo')['ʘbefore'][0] ).toBeTruthy()

    })


    it('should run the before modifier', () => {
        class SimpleTrait { 

            bar: boolean
            before: boolean

            @before
            foo() {
                this.before = this.bar ? false : true
            }
        }

        interface SimpleObject extends SimpleTrait {};

        
        class SimpleObject  {

            bar: boolean

            foo() {
                this.bar = true
            }

         }

        meta(SimpleObject).include(SimpleTrait)

        o = new SimpleObject()
        o.foo()
        expect( o.before ).toBeTrue()
    })

    it('should run multiple before modifiers', () => {
        class ATrait { 

            count: number

            @before
            foo() {
                this.count || ( this.count = 0 )
                this.count += 1
            }
        }

        class BTrait { 

            count: number

            @before
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

})