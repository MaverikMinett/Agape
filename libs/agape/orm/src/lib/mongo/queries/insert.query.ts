import { Collection, ObjectId } from 'mongodb';
import { Class } from '@agape/types';
import { Document, Model } from '@agape/model';


export class InsertQuery<T extends Class> {

    constructor( 
        public model: T, 
        public collection: Collection, 
        public item: Pick<InstanceType<T>, keyof InstanceType<T>> ) {

    }

    async exec( ): Promise<{ id: string }> {
        const descriptor = Model.descriptor(this.model)
        const fields = descriptor.fields.all().filter( f => ! f.primary )

        const _item: any = { }
        for ( let field of fields ) {
            if ( field.designType instanceof Function && field.designType.prototype as any instanceof Document ) {
                const designTypeModelDescriptor = Model.descriptor(field.designType)
                const fieldValue = descriptor.fields.get( field.name ).getValue(this.item)
                if ( fieldValue !== undefined && fieldValue !== null ) {
                    const idString = designTypeModelDescriptor.primaryField.getValue( fieldValue )

                    const objectId = new ObjectId(idString)
                    _item[field.name] = objectId
                }
                else {
                    _item[field.name] = this.item[field.name]
                }
                
            }
            else if ( field.foreignKey === true ) {
                if ( this.item[field.name] !== undefined && this.item[field.name] !== null ) {
                    _item[field.name] = new ObjectId(this.item[field.name])
                }
                else {
                    _item[field.name] = this.item[field.name]
                }
            }
            else {
                _item[field.name] = this.item[field.name]
            }
        }

        const result = await this.collection.insertOne( _item )
        if ( descriptor.primaryField ) descriptor.primaryField.setValue(this.item, result.insertedId.toString())
        return { id: result.insertedId.toString() }
    }


}