import { Collection, ObjectId } from 'mongodb';
import { Class, Dictionary } from '@agape/types';
import { inflate } from '@agape/object';
import { Model } from '@agape/model';

export class RetrieveQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string ) {

    }

    async exec( ): Promise<Pick<InstanceType<T>, keyof InstanceType<T>>> {
        let _id: ObjectId
        try {
            _id = new ObjectId(this.id)
        }
        catch {
            throw new Error(`Invalid record ${this.id}`)
        }

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
        const selection: Dictionary = { _id }
        
        /* mongo query */
        const record = await this.collection.findOne( selection, projection )

        /* record not found */
        if ( ! record ) return undefined

        /* record */
        return record as any
    }

    async inflate( ): Promise<InstanceType<T>> {
        const record = await this.exec()
        return inflate<T>( this.model, record )
    }
}