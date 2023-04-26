import { Collection } from 'mongodb';
import { Class } from '@agape/types';
import { inflate } from '@agape/object';

export class LookupQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public filter: any ) {

    }

    async exec( ): Promise<Array<Pick<InstanceType<T>, keyof InstanceType<T>>>> {
        const records = await this.collection.find({  }).toArray()
        for ( let record of records ) {
            record.id = record._id.toString()
            delete record._id
        }

        return records as any[]
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( [this.model], record )
    }
}
