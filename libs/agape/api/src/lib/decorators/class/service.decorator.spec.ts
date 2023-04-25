
import { ServiceDescriptor } from '../../descriptors'
import { Service } from './service.decorator'

describe('Controller', () => {

    it('should decorate a class', () => {
        @Service()
        class FooService { }
        /* test passes if no errors */
    })

    it('should create a service descriptor', () => {
        @Service()
        class FooService { }
        const d = Reflect.getMetadata( "service:descriptor", FooService.prototype )
        expect(d).toBeInstanceOf(ServiceDescriptor)
    })

    describe('Service.descriptor', () => {
        it('should return a descriptor for the target', () => {
            @Service()
            class FooService { }
            const d = Service.descriptor(FooService)
            const e = Reflect.getMetadata( "service:descriptor", FooService.prototype )
            expect(d).toBe(e)
        })
    })


    describe('dependency injection', () => {
        it('should store type data about constructor params', () => {
            @Service()
            class BarService {}

            @Service()
            class FooService { 
                constructor( bar: BarService) { }
            }

            const d = Service.descriptor(FooService)
            expect(d.services).toEqual([BarService])
        })
        it('should throw an error of non-injectable set in constructor', () => {
            
            const tryit = () => {
                class NotABarService {}

                @Service()
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