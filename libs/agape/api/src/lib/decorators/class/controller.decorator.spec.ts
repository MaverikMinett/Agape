
import { ControllerDescriptor, StubDescriptor } from '../../descriptors'
import { Get } from '../controller/get'
import { Controller } from './controller.decorator'
import { Service } from './service.decorator'

describe('Controller', () => {

    it('should decorate a class', () => {
        @Controller()
        class FooController { }
        /* test passes if no errors */
    })

    it('should create a controller descriptor', () => {
        @Controller()
        class FooController { }
        const d = Reflect.getMetadata( "controller:descriptor", FooController.prototype )
        expect(d).toBeInstanceOf(ControllerDescriptor)
    })

    describe('Controller.descriptor', () => {
        it('should return a descriptor for the target', () => {
            @Controller()
            class FooController { }
            const d = Controller.descriptor(FooController)
            const e = Reflect.getMetadata( "controller:descriptor", FooController.prototype )
            expect(d).toBe(e)
        })
    })

    describe('call signatures', () => {
        describe('only path', () => {
            it('should set the path on the descriptor', () => {
                @Controller('foos')
                class FooController { }
                const d = Controller.descriptor(FooController)
                expect(d.path).toBe('foos')
            })
        })
        describe('only params', () => {
            it('should set the params on the descriptor', () => {
                @Controller({'path': 'foos'})
                class FooController { }
                const d = Controller.descriptor(FooController)
                expect(d.path).toBe('foos')
            })
        })
        describe('path and params', () => {
            it('should set the params on the descriptor', () => {
                @Controller('foos', {'path': 'foo-override'})
                class FooController { }
                const d = Controller.descriptor(FooController)
                expect(d.path).toBe('foo-override')
            })
        })
    })

    describe('dependency injection', () => {
        it('should store type data about constructor params', () => {
            @Service()
            class FooService {}

            @Controller({'path': 'foos'})
            class FooController { 
                constructor( service: FooService) { }
            }

            const d = Controller.descriptor(FooController)
            expect(d.services).toEqual([FooService])
        })
        it('should throw an error of non-injectable set in constructor', () => {
            
            const tryit = () => {
                class NotAFooService {}

                @Controller({'path': 'foos'})
                class FooController { 
                    constructor( service: NotAFooService) { }
                }    
            }

            expect(tryit).toThrowError()
        })
    })

    describe('stubs', () => {
        it ('should call finalizeController on the stub', () => {
            
            class FooController { 
                @Get() 
                bar() {

                }
            }

            const stub = StubDescriptor.descriptor( FooController )
            expect(stub).toBeTruthy()
            jest.spyOn(stub,'finalizeController')

            const decorator = Controller({'path': 'foos'})
            decorator(FooController)

            const descriptor = Controller.descriptor(FooController)

            expect(stub.finalizeController).toHaveBeenCalledWith(descriptor)
        })
    })

})