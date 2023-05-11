import { Collection } from 'mongodb';
import { Class, Dictionary } from '@agape/types';
import { Model } from '@agape/model';
import { inflate } from '@agape/object';

export class ListQuery<T extends Class> {

    constructor( public model: T, public collection: Collection ) {

    }

    async exec( ): Promise<Array<Pick<InstanceType<T>, keyof InstanceType<T>>>> {

        const descriptor = Model.descriptor(this.model)

        console.log("VIEW", descriptor)

        const projection: Dictionary = { _id: 0 }

        const primaryField = descriptor.fields.all().find( f => f.primary )
        if ( primaryField ) {
            projection[primaryField.name] = { $toString: "$_id" }
        }

        const otherFields = descriptor.fields.all().filter( f => ! f.primary )
        for ( let field of otherFields ) {
            projection[field.name] = 1
        }

        const records = await this.collection.find(
            {},
            { projection }
        )
        .toArray()

        return records as any[]
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( [this.model], record )
    }
}