import { Dictionary } from "./types"
import { unveil } from "./unveil"


describe('unveil', () => {

    it('should create a psuedo-object', () => {
        class Foo {
            bar: string = "baz"
        }

        const o = new Foo()

        const ps = unveil(o)
        expect( ps ).toBeTruthy()
    })



    describe('the psuedo object', () => {
        it('should not equal the original object', () => {
            class Foo { bar: string = "baz" }
    
            const o = new Foo()
    
            const ps = unveil(o)
            expect( ps === o ).toBe(false)
            expect( ps instanceof Foo ).toBe(false)
        })
        it('should not be an instance of the original object', () => {
            class Foo { bar: string = "baz" }
    
            const o = new Foo()
    
            const ps = unveil(o)
            expect( ps instanceof Foo ).toBe(false)
        })

        it('should not be an instance of the original objects class', () => {
            class Foo { bar: string = "baz" }
    
            const o = new Foo()
    
            const ps = unveil(o)
            expect( ps instanceof Foo ).toBe(false)
        })

        it('the psuedo objects class should have the same name as the original', () => {
            class Foo { bar: string = "baz" }
    
            const o = new Foo()
    
            const ps = unveil(o)
            expect( Object.getPrototypeOf(ps).constructor.name ).toBe(Object.getPrototypeOf(o).constructor.name)
        })

        describe('the properties', () => {
            it('should have the same properties and primitive values', () => {
                class Foo { 
                    a: string = "bar" 
                    b: number = 42
                }
        
                const o = new Foo()
        
                const ps = unveil(o)
                expect( ps.a ).toEqual(o.a)
                expect( ps.b ).toEqual(o.b)
            })

            // fails but prints correctly, odd message
            it('should have an equivalent but different dictionary property', () => {
                class Foo {
                    a: Dictionary = { 'bar': 'baz' }
                }
                const o = new Foo()
        
                const ps = unveil(o)
                console.log( ps )
                expect( ps.a ).toEqual( Object({ 'bar': 'baz' }))
            })
            it('should have an equivalent but different array property', () => {
                class Foo {
                    a: Array<string> = [ 'bar', 'baz' ]
                }
                const o = new Foo()
        
                const ps = unveil(o)
                expect( ps.a ).toEqual(o.a)
                expect( ps.a === o.a ).toBe(false)
            })
        })


    })

    it('should create a nested psuedo-object', () => {
        class Foo {
            
        }
        class Bar {
            foo: Foo = new Foo()
        }


        const o = new Bar()

        const ps = unveil(o)
        expect( ps.foo ).toBeTruthy()
    })

    describe('the nested psuedo object', () => {

        it('should not be the original object', () => {
            class Foo { }
            class Bar { foo: Foo = new Foo() }
            const o = new Bar()
    
            const ps = unveil(o)
            expect( ps.foo === o.foo ).toBe(false)
        })
        it('should not be an instance of the original objects class', () => {
            class Foo { }
            class Bar { foo: Foo = new Foo() }
            const o = new Bar()
    
            const ps = unveil(o)
            expect( ps.foo instanceof Foo ).toBe(false)
        })
        it('should have it\'s data', () => {
            class Foo { baz: string = "biz" }
            class Bar { foo: Foo = new Foo() }
            const o = new Bar()
    
            const ps = unveil(o)
            expect( ps.foo.baz ).toBe(o.foo.baz)
        })
    })

    it('should unveil an inherited object', () => {
        class Foo {
            a: string = "A"
        }
        class Bar extends Foo {
            b: string = "B"
        }

        const o = new Bar()

        const ps = unveil(o)
        expect( ps ).toBeTruthy()
    })
    describe('an inherited psuedo-object', () => {

        it('the psuedo objects class should have the same name as the class', () => {
            class Foo { a: string = "A" }
            class Bar extends Foo { b: string = "B" }
    
            const o = new Foo()
    
            const ps = unveil(o)
            expect( Object.getPrototypeOf(ps).constructor.name ).toBe(Object.getPrototypeOf(o).constructor.name)
        })

        it('should have it\'s data', () => {
            class Foo { baz: string = "biz" }
            class Bar { foo: Foo = new Foo() }
            const o = new Bar()
    
            const ps = unveil(o)
            expect( ps.foo.baz ).toBe(o.foo.baz)
        })
    })


})