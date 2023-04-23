import { Api } from './api';


describe('Api', () => {

    let a: Api

    beforeEach( () => {
        a = undefined
    })

    it('should instantiate', () => {

        a = new Api()
        expect(a).toBeInstanceOf(Api)
    })


})
