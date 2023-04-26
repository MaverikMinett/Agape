import { Collection, ObjectId } from 'mongodb';
import { Class, Dictionary } from '@agape/types';
import { Exception } from '@agape/exception';

export class DeleteQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string ) {

    }

    async exec( ) {
        console.log("Perform delete")
        let _id: ObjectId
        try {
            _id = new ObjectId(this.id)
        }
        catch {
            throw new Error(`Invalid record ${this.id}`)
        }
        /* selection */
        const selection: Dictionary = { _id }

        const result = await this.collection.deleteOne(
            selection
        )

        if ( result.deletedCount === 0 ) {
            throw new Exception(404, `Could not delete ${this.model.name} record with id ${this.id}, record not found`)
        }
        if ( result.acknowledged === false ) {
            throw new Exception(500, `Could not delete ${this.model.name} record with id ${this.id}, database did not acknowledge request`)
        }

    }

}