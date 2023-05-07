
import { include } from "../decorators/include";
import { meta } from "../meta";
import { Buildable } from "./buildable";




let o;
describe('Buildable trait', () => {

    afterEach( () => {
        o = undefined;
    })

    it('should apply the trait', () => {

        class ATrait {
            foo = "bar"
        }

        @include( Buildable )
        class AClass {

        }

        expect( meta(AClass).does( Buildable ) ).toBe(true)
    })


})