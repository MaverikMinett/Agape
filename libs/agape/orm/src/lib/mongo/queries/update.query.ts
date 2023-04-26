import { Collection, ObjectId } from 'mongodb';
import { Class, Dictionary } from '@agape/types';
import { Model } from '@agape/model';
import { Exception } from '@agape/exception';


export class UpdateQuery<T extends Class> {

    constructor( public model: T, public collection: Collection, public id: string, public item: Pick<T, keyof T> ) {

    }

    async exec( ) {
        let _id: ObjectId
        try {
            _id = new ObjectId(this.id)
        }
        catch {
            throw new Error(`Invalid record ${this.id}`)
        }

        const descriptor = Model.descriptor(this.model)
        const fields = descriptor.fields.all().filter( f => ! f.primary )

        const _item: any = { }
        for ( let field of fields ) {
            _item[field.name] = this.item[field.name] 
        }

        /* selection */
        const selection: Dictionary = { _id }

        const result = await this.collection
            .updateOne(
                selection,
                { $set: _item }
            )

        if ( result.matchedCount === 0 ) {
            throw new Exception(404, `Could not update ${this.model.name} record with id ${this.id}, record not found`)
        }
        if ( result.acknowledged === false ) {
            throw new Exception(500, `Could not update ${this.model.name} record with id ${this.id}, database did not acknowledge request`)
        }
    }

}