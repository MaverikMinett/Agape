
import { InjectableDescriptor } from '../../descriptors'
import { Injectable } from './injectable.decorator'

describe('Controller', () => {

    it('should decorate a class', () => {
        @Injectable()
        class FooService { }
        /* test passes if no errors */
    })

    it('should create a service descriptor', () => {
        @Injectable()
        class FooService { }
        const d = Reflect.getMetadata( "service:descriptor", FooService.prototype )
        expect(d).toBeInstanceOf(InjectableDescriptor)
    })

    describe('Injectable.descriptor', () => {
        it('should return a descriptor for the target', () => {
            @Injectable()
            class FooService { }
            const d = Injectable.descriptor(FooService)
            const e = Reflect.getMetadata( "service:descriptor", FooService.prototype )
            expect(d).toBe(e)
        })
    })


    describe('dependency injection', () => {
        it('should store type data about constructor params', () => {
            @Injectable()
            class BarService {}

            @Injectable()
            class FooService { 
                constructor( bar: BarService) { }
            }

            const d = Injectable.descriptor(FooService)
            expect(d.services).toEqual([BarService])
        })
        it('should throw an error of non-injectable set in constructor', () => {
            
            const tryit = () => {
                class NotABarService {}

                @Injectable()
                class FooService { 
                    constructor( bar: NotABarService) { }
                } 
            }

            expect(tryit).toThrowError()
        })
    })

    // TODO:
    // describe('stubs', () => {
    //     it ('should call finalizeService on the stub', () => {
            
    //         class FooService { 

    //             @Description() // <---- THIS RIGHT HERE
    //             bar() {

    //             }
    //         }

    //         const stub = StubDescriptor.descriptor( FooController )
    //         expect(stub).toBeTruthy()
    //         jest.spyOn(stub,'finalizeController')

    //         const decorator = Controller({'path': 'foos'})
    //         decorator(FooController)

    //         const descriptor = Controller.descriptor(FooController)

    //         expect(stub.finalizeController).toHaveBeenCalledWith(descriptor)
    //     })
    // })

})