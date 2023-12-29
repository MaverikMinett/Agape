import { Collection } from 'mongodb';
import { Class } from '@agape/types';
import { Model } from '@agape/model';
import { itemToNewRecord } from '../../util';


export class InsertQuery<T extends Class> {

    constructor( 
        public model: T, 
        public collection: Collection, 
        public item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {

    }

    async exec( ): Promise<{ id: string }> {

        const record = itemToNewRecord(this.model, this.item)

        const result = await this.collection.insertOne( record )

        const descriptor = Model.descriptor(this.model)
        if ( descriptor.primaryField ) descriptor.primaryField.setValue(this.item, result.insertedId.toString())
        
        return { id: result.insertedId.toString() }
    }


}