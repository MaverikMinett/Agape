import { Collection, ObjectId } from 'mongodb';
import { Class } from '@agape/types';


export class UpdateQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string, public item: Pick<T, keyof T> ) {

    }

    async exec( ) {
        console.log(`Update query`, this.id, this.item)
        const result = await this.collection.updateOne({ _id: new ObjectId(this.id) }, { $set: this.item } )
        console.log(`Executed update query`, result)
        return result.modifiedCount;
    }

}