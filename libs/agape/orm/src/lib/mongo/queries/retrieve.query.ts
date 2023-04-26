import { Collection, ObjectId } from 'mongodb';
import { Class } from '@agape/types';
import { inflate } from '@agape/object';

export class RetrieveQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string ) {

    }

    async exec( ): Promise<Pick<InstanceType<T>, keyof InstanceType<T>>> {
        const record = await this.collection.findOne({ _id: new ObjectId(this.id) })
        if ( ! record ) return

        record.id = record._id.toString()
        delete record._id
        return record as any
    }

    async inflate( ): Promise<InstanceType<T>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}