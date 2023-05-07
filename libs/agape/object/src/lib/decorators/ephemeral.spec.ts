
import { ephemeral } from './ephemeral'


let o;
describe('ephemeral decorator', () => {

    afterEach( () => {
        o = undefined;
    })


    it('should declare the property', () => {

        class SimpleObject  { 

            @ephemeral( (o) => ['hello'] )
            foo: Array<any>

        }

        expect( SimpleObject.prototype.hasOwnProperty('foo') ).toBe(true)

    })


    it('should provide the ephemeral value if the value is unset', () => {
        class SimpleObject  { 

            @ephemeral( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        expect( o.ʘfoo ).toEqual(undefined)
        expect( o.foo ).toEqual(['hello'])
        expect( o.ʘfoo).toEqual(undefined)
    })

    it('should allow writing of the property to the instance', () => {
        class SimpleObject  { 

            @ephemeral( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        o.foo = ['bar']

        expect( o.foo  ).toEqual(['bar'])
    })


    it('should use a unique ephemeral value instance for each object instance', () => {
        class SimpleObject  { 

            @ephemeral( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        let o2: any = new SimpleObject()
        expect( o.foo != o2.foo ).toBe(true)
    })

})