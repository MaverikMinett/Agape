import { Serializer } from "./serializer"


describe('Serializer', () => {


    describe('subclassing', () => {
        it('can be subclassed', () => {

            class Foo { }

            class FooSerializer extends Serializer {
                to = Foo
            }

            const s = new FooSerializer()
            expect( s ).toBeTruthy()
            expect( s.to ).toBe(Foo)

        })

        describe('inflate', () => {
            it('can provide a restricted signature', () => {
                class Foo {
                    constructor( public name: string ) {

                    }
                 }

                class FooSerializer extends Serializer {
                    inflate( value:string ) {
                        return new Foo(value)
                    }
                }

                const o = new FooSerializer().inflate("Bar")
                expect( o ).toBeTruthy()
                expect( o ).toBeInstanceOf(Foo)
                expect( o.name ).toBe("Bar")
            })
        })
    })

})