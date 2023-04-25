import { Api } from './api';
import { Module } from './decorators';


describe('Api', () => {

    let a: Api

    @Module() 
    class FooModule {

    }

    beforeEach( () => {
        a = undefined
    })

    it('should instantiate', () => {
        a = new Api(FooModule)
        expect(a).toBeInstanceOf(Api)
    })

})
