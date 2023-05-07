
import { meta } from "../meta";
import { property } from "./property"


let o;
describe('property decorator', () => {

    afterEach( () => {
        o = undefined;
    })

    it('should declare the property', () => {

        class SimpleObject  { 

            @property(32) 
            foo: Number

        }

        expect( SimpleObject.prototype.hasOwnProperty('foo') ).toBe(true)

    })


    it('should provide the default value', () => {
        class SimpleObject  { 

            @property(32) 
            foo: Number
        }

        let o: any = new SimpleObject()
        expect( o.ʘfoo ).toEqual(undefined)
        expect( o.foo ).toEqual(32)
        expect( o.ʘfoo).toEqual(32)
    })

    it('should allow writing to the value', () => {
        class SimpleObject  { 

            @property(32) 
            foo: Number
        }

        let o: any = new SimpleObject()
        o.foo = 45
        expect(o.foo).toEqual(45)
    })

    it('should use a unique value instance for each object instance', () => {
        class SimpleObject  { 

            @property(32) 
            foo: Number

        }

        let o: any = new SimpleObject()
        o.foo = 45
        let o2: any = new SimpleObject()
        expect( o.foo != o2.foo ).toBe(true)
    })

    it('should lazily provide the default value', () => {
        class SimpleObject  { 

            @property( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        expect( o.ʘfoo ).toEqual(undefined)
        expect( o.foo ).toEqual(['hello'])
        expect( o.ʘfoo).toEqual(['hello'])
    })

    it('should use a unique lazy value instance for each object instance', () => {
        class SimpleObject  { 

            @property( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        let o2: any = new SimpleObject()
        expect( o.foo != o2.foo ).toBe(true)
    })

    it('should work on a trait', () => {
        class SimpleTrait  { 

            @property( (o) => ['hello'] )
            foo: Array<any>

        }

        interface SimpleObject extends SimpleTrait {}

        class SimpleObject { }

        meta(SimpleObject).include(SimpleTrait)


        let o: any = new SimpleObject()
        expect( o.foo  ).toEqual(['hello'])
    })

})