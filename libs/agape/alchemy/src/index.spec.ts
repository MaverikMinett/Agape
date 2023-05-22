

import { Alchemy, alchemy } from "./index";

describe('alechemy', () => {

    it('should exist', () => {
        expect(alchemy).toBeInstanceOf(Alchemy)
    })

    it('should have the date serializer', () => {
        expect( alchemy.serializers.get(Date) ).toBeTruthy()
    })

})