
import { lazy } from './lazy'


let o;
describe('lazy decorator', () => {

    afterEach( () => {
        o = undefined;
    })


    it('should have declare the property', () => {

        class SimpleObject  { 

            @lazy( (o) => ['hello'] )
            foo: Array<any>

        }

        expect( SimpleObject.prototype.hasOwnProperty('foo') ).toBe(true)

    })


    it('should lazily provide the default value', () => {
        class SimpleObject  { 

            @lazy( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        expect( o.ʘfoo ).toEqual(undefined)
        expect( o.foo ).toEqual(['hello'])
        expect( o.ʘfoo).toEqual(['hello'])
    })

    it('should allow writing to the instance', () => {
        class SimpleObject  { 

            @lazy( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        o.foo = ['bar']

        expect( o.foo  ).toEqual(['bar'])
    })

    

    it('should use a unique value instance for each object instance', () => {
        class SimpleObject  { 

            @lazy( (o) => ['hello'] )
            foo: Array<any>

        }

        let o: any = new SimpleObject()
        let o2: any = new SimpleObject()
        expect( o.foo != o2.foo ).toBe(true)
    })

})