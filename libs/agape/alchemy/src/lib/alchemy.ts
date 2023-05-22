import { Model } from "@agape/model"
import { Serializer } from "@agape/object"
import { Class } from "@agape/types"
import { Transmuted } from './transmuted'

export class Alchemy {

    serializers = new Map()

    register<T extends Class>( type: T, serializer: Serializer ) {
        this.serializers.set(type, serializer)
    }


    inflate<T extends Class>( model: T, flattened: Transmuted<InstanceType<T>>  ): InstanceType<T>
    inflate<T extends Class>( model: T, flattened: Array<Transmuted<InstanceType<T>>> ) : Array<InstanceType<T>>
    inflate<T extends Class>( model: T, flattened: Transmuted<InstanceType<T>>|Array<Transmuted<InstanceType<T>>>  ) {
        return flattened instanceof Array 
            ? this.inflateArray( model, flattened )
            : this.inflateInstance( model, flattened )
    }


    protected inflateArray<T extends Class>( model: T, flattened: Array<Transmuted<InstanceType<T>>> ) {
        return flattened.map( f => this.inflateInstance(model, f) )
    }

    protected inflateInstance<T extends Class>( model: T, flattened: Transmuted<InstanceType<T>>  ): InstanceType<T> {

        const descriptor = Model.descriptor(model)

        const fields = descriptor.fields.all()

        const inflated: any = { }

        for ( let field of fields ) {

            const designType = field.designType

            const serializer = this.serializers.get(designType)

            const value = flattened[field.name]

            if ( value !== undefined ) {
                const inflatedValue = serializer ? serializer.inflate(value) : value

                inflated[field.name] = inflatedValue
            }
            else {
                inflated[field.name] = undefined
            }


        }

        const instance = new model()

        Object.assign(instance, inflated)

        return instance
    }

    deflate<T extends Class>( model: T, instance: InstanceType<T> )
    deflate<T extends Class>( model: T, instances: Array<InstanceType<T>> )
    deflate<T extends Class>( model: T, instance: InstanceType<T>|Array<InstanceType<T>> ) {
        return instance instanceof Array 
            ? this.deflateArray(model, instance)
            : this.deflateInstance(model, instance)
    }

    
    protected deflateInstance<T extends Class>( model: T, instance: InstanceType<T> )
     {
        const descriptor = Model.descriptor(model)

        if ( ! descriptor ) {
            throw new Error(`${model.name} is not a data model`)
        }

        const fields = descriptor.fields.all()

        const deflated: any = { }

        for ( let field of fields ) {

            const designType = field.designType

            const serializer = this.serializers.get(designType)

            const value = instance[field.name]

            if ( value !== undefined ) {
                const deflatedValue = serializer ? serializer.deflate(value) : value

                deflated[field.name] = deflatedValue
            }
            else {
                deflated[field.name] = undefined
            }
        }

        return deflated
    }

    protected deflateArray<T extends Class>( model: T, instances: Array<InstanceType<T>> ) {
        return instances.map( i => this.deflateInstance(model, i) )
    }
}


