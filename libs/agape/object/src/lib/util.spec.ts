import { classExtends } from './util'

describe('utility functions', () => {
    describe('classExtends', () => {
        it('should return true if class and ancestor are the same', () => {
            class Foo {

            }
            expect( classExtends(Foo, Foo) ).toBe(true)
        })
        it('should return true if a child class extends the parent class', () => {
            class Foo {

            }
            class Bar extends Foo {

            }
            expect( classExtends(Bar, Foo) ).toBe(true)
        })
        it('should return true flase if a class does not extend the another class', () => {
            class Foo {

            }
            class Bar  {

            }
            expect( classExtends(Bar, Foo) ).toBe(false)
        })
    })
})