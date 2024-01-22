
import { FieldDescriptor, Model, Validators } from '@agape/model'
import { Class } from '@agape/types'



export class Attest {

    validate<T extends Class>( model: T, instance: InstanceType<T> ) {
        const { valid, error } = this.validateModel( model, instance )
        return { valid, error }
    }

    validateModel<T extends Class>( model: T, instance: InstanceType<T> ) {

        const descriptor = Model.descriptor( model )

        if ( ! descriptor ) {
            throw new Error(`Cannot validate, ${model.name} is not a model`)
        }

        let modelValid: boolean = true
        const modelErrors: any = {}

        for ( let field of descriptor.fields.all() ) {
            let value = instance[field.name]
            const { valid, error } = this.validateField(instance, field, value)
            if ( valid  === false ) {
                modelErrors[field.name] = error
            }
        }

        return { valid: modelValid, error: modelErrors }
    }


    validateField( instance: any, field: FieldDescriptor, value: any ) {
        let validators: Function[] = []

        if ( field.required ) validators.push( Validators.required )

        if ( field.designType === Number ) {
            if ( defined(field.min) ) validators.push( Validators.min(field.min) )
            if ( defined(field.max) ) validators.push( Validators.max(field.max) )
        }
        if ( field.designType === String ) {
            if ( defined(field.minLength) ) validators.push( Validators.maxLength(field.maxLength) )
            if ( defined(field.maxLength) ) validators.push( Validators.maxLength(field.maxLength) )
        }

        if ( field.validators ) {
            validators.push( ...field.validators )
        }

        for ( let validator of validators ) {
            const errors = validator( value, instance )
            if ( errors ) {
                let valid = false
                let entries = Object.entries(errors)
                const [ key, error ] = entries[0]
                return { valid, error }
            }
        }

        // validate models after any custom validators have run
        if ( typeof field.designType === 'function' && field.designType.prototype ) {
            const descriptor = Model.descriptor(field.designType)
            if ( descriptor ) {
                const { valid, error } = this.validateModel(field.designType, value)
                if ( ! valid ) {
                    return { valid, error }
                }
            }
        }

        return { valid: true, error: undefined }
    }

    // validateField<T extends Class>( model: T, field: keyof <InstanceType<T>>, instance: InstanceType<T> ) {
    //     const descriptor = Model.descriptor(model)
    //     if ( ! descriptor ) {
    //         throw new Error(`${model.name} is not a valid model`)
    //     }

    //     const fieldDescriptor = descriptor.fields.get(field)
    //     if ( ! fieldDescriptor ) {
    //         throw new Error(`Field ${field} does not exist on model ${model.name}`)
    //     }

    //     return this._validateField( instance, fieldDescriptor, instance[field])
    // }


}








// export function validate<T extends Class>( model: T, instance: InstanceType<T> ) {

// }