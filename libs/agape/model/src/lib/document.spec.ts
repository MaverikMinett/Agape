import { Document } from './document';


describe('Document', () => {

    let d: Document

    beforeEach( () => {
        d = undefined
    })

    it('can instantiate', () => {
        const d = new Document()
        expect(d).toBeTruthy()
    })

})
