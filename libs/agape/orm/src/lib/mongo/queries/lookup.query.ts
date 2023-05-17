import { Collection, ObjectId } from 'mongodb';
import { Class, Dictionary, Interface } from '@agape/types';
import { inflate } from '@agape/object';
import { Model } from '@agape/model';

export class LookupQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public filter: Dictionary ) {

    }

    async exec( ): Promise<Interface<InstanceType<T>>> {

        const descriptor = Model.descriptor(this.model)

        /* projection */
        const projection: Dictionary = { _id: 0 }

        const primaryField = descriptor.fields.all().find( f => f.primary )
        if ( primaryField ) {
            projection[primaryField.name] = { $toString: "$_id" }
        }

        const otherFields = descriptor.fields.all().filter( f => ! f.primary )
        for ( let field of otherFields ) {
            projection[field.name] = 1
        }

        /* selection */
        const selection: Dictionary = this.filter
        
        /* mongo query */
        const record = await this.collection.findOne( selection, { projection } )

        /* record not found */
        if ( ! record ) return undefined

        /* record */
        return record as any
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}