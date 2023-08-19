import { Injectable } from "./decorators"
import { Injector } from "./injector"



describe('Injector', () => {

    let i: Injector

    beforeEach( () => {
        i = undefined
    })


    it('should instantiate', () => {
        i = new Injector()
        expect(i).toBeInstanceOf(Injector)
    })

    describe('get', () => {

        @Injectable() class FooService { }

        class NotAService { }

        beforeEach( () => {
            i = new Injector()
        })

        it('should return an instance of the service', () => {
            const s = i.get(FooService)
            expect(s).toBeInstanceOf(FooService)
        })

        it('should return the same instance of the service', () => {
            const s1 = i.get(FooService)
            const s2 = i.get(FooService)
            expect(s1).toBe(s2)
        })

        it('should not provide a service with no service decorator', () => {
            expect( () => i.get(NotAService) ).toThrowError()
        })
    })

    describe('a services with a service', () => {
        @Injectable() class DooService { }
        @Injectable() class FooService { }

        @Injectable() class BarService { 
            constructor ( public doo: DooService, public foo: FooService ) {

            }
        }

        beforeEach( () => {
            i = new Injector()
        })

        it('should create the service', () => {
            const s = i.get(BarService)
            expect(s).toBeInstanceOf(BarService)
        })

        it('should have the child service', () => {
            const s = i.get(BarService)
            expect(s.foo).toBeInstanceOf(FooService)
        })
        it('should have multiple child services', () => {
            const s = i.get(BarService)
            expect(s.foo).toBeInstanceOf(FooService)
            expect(s.doo).toBeInstanceOf(DooService)
        })
    })




})