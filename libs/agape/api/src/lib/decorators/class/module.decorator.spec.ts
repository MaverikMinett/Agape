
import { ModuleDescriptor, StubDescriptor } from '../../descriptors'
import {  } from '../../descriptors/module.descriptor'
import { Get } from '../controller/get'
import { Controller } from './controller.decorator'
import { Module } from './module.decorator'
import { Service } from './service'

describe('Module', () => {

    it('should decorate a class', () => {
        @Module()
        class FooModule { }
        /* test passes if no errors */
    })

    it('should create a module descriptor', () => {
        @Module()
        class FooModule { }
        const d = Reflect.getMetadata( "api:module:descriptor", FooModule.prototype )
        expect(d).toBeInstanceOf(ModuleDescriptor)
    })


    describe('Module.descriptor', () => {
        it('should return a descriptor for the target', () => {
            @Module()
            class FooModule { }
            const d = Module.descriptor(FooModule)
            const e = Reflect.getMetadata( "api:module:descriptor", FooModule.prototype )
            expect(d).toBe(e)
        })
    })

    describe('call signatures', () => {
        describe('only path', () => {
            it('should set the path on the descriptor', () => {
                @Module('foos')
                class FooModule { }
                const d = Module.descriptor(FooModule)
                expect(d.path).toBe('foos')
            })
        })
        describe('only params', () => {
            it('should set the params on the descriptor', () => {
                @Module({'path': 'foos'})
                class FooModule { }
                const d = Module.descriptor(FooModule)
                expect(d.path).toBe('foos')
            })
        })
        describe('path and params', () => {
            it('should set the params on the descriptor', () => {
                @Module('foos', {'path': 'foo-override'})
                class FooModule { }
                const d = Module.descriptor(FooModule)
                expect(d.path).toBe('foo-override')
            })
        })
    })

    describe('parameter validation', () => {
        describe('modules', () => {
            it('should validate the module', () => {
                @Module()
                class BarModule { }
    
                @Module({
                    modules: [BarModule]
                })
                class FooModule { }
            })
            it('should throw an error', () => {
                expect( () => {
                    class NotABarModule { }
        
                    @Module({
                        modules: [NotABarModule]
                    })
                    class FooModule { }
                }).toThrowError()
            })
        })

        describe('controllers', () => {
            it('should validate the controller', () => {
                @Controller()
                class FooController { }
    
                @Module({
                    controllers: [FooController]
                })
                class FooModule { }
            })
            it('should throw an error', () => {
                expect( () => {
                    class NotAFooController { }
        
                    @Module({
                        controllers: [NotAFooController]
                    })
                    class FooModule { }
                }).toThrowError()
            })
        })
        describe('provides', () => {
            it('should validate the service', () => {
                @Service()
                class FooService { }
    
                @Module({
                    provides: [FooService]
                })
                class FooModule { }
            })
            it('should throw an error', () => {
                expect( () => {
                    class NotAFooService { }
        
                    @Module({
                        provides: [NotAFooService]
                    })
                    class FooModule { }
                }).toThrowError()
            })
        })
    })

})