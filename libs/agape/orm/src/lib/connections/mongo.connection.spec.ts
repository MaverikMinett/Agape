import { MongoConnection } from './mongo.connection';


describe('MongoConnection', () => {

    let c 

    beforeEach( () => {
        c = undefined
    })

    it('should instantiate', () => {

        c = new MongoConnection('mongodb://localhost:27017')

    })

})