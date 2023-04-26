import { Collection, ObjectId } from 'mongodb';
import { Class } from '@agape/types';

export class DeleteQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string ) {

    }

    async exec( ) {
        const result = await this.collection.deleteOne({ _id: new ObjectId(this.id) })
        return result.deletedCount
    }

}