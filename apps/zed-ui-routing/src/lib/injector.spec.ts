
import { Injector } from './injector'
import 'reflect-metadata';

describe('Injector', () => {

    let i: Injector

    it('should instantiate', () => {
        i = new Injector()
        expect(i).toBeInstanceOf(Injector)
    })

    it('should instantiate with a parent', () => {
        const p = new Injector()
        i = new Injector(p)
        expect(i).toBeInstanceOf(Injector)
    })

    it('should provide a class', () => {
        class FooService { }
        i = new Injector()
        i.provide( FooService )
        expect(i.providers.get(FooService) ).toEqual({ useClass: FooService })
    })

    it('should get a class service', () => {
        class FooService { }
        i = new Injector()
        i.provide( FooService )
        const instance = i.get(FooService)
        expect(instance).toBeInstanceOf(FooService)
    })

    it('should provide a value', () => {
        class FooService { }
        const foo = new FooService()
        i = new Injector()
        i.provide( FooService, foo )
        expect(i.get(FooService) ).toBe(foo)
    })

    it('should get value provided by a parent service', () => {
        class FooService { }
        const p = new Injector()
        i = new Injector(p)
        p.provide( FooService )
        const instance = i.get(FooService)
        expect(instance).toBeInstanceOf(FooService)
    })
})