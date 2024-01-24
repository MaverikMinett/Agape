import { Class } from "@agape/types"
import { Model } from "./decorators/class/model"
import { FieldDescriptor } from "./descriptors"
import { Validators } from "./validators"


export function validate<T extends Class>( model: T, instance: InstanceType<T> ) {
    const { valid, error } = validateModel( model, instance )
    return { valid, error }
}

// private
function defined( value: any ) {
    return value === undefined || value == null ? false : true
}

// private
function validateModel<T extends Class>( model: T, instance: InstanceType<T> ) {

    const descriptor = Model.descriptor( model )

    if ( ! descriptor ) {
        throw new Error(`Cannot validate, ${model.name} is not a model`)
    }

    let modelValid: boolean = true
    const modelErrors: any = {}

    for ( let field of descriptor.fields.all() ) {
        let value = instance[field.name]
        const { valid, error } = validateField(instance, field, value)
        if ( valid  === false ) {
            modelErrors[field.name] = error
        }
    }

    return { valid: modelValid, error: modelErrors }
}


export function getValidators( field: FieldDescriptor) {
    let validators: Function[] = []

    if ( field.required ) validators.push( Validators.required )

    if ( field.designType === Number ) {
        if ( defined(field.min) ) validators.push( Validators.min(field.min) )
        if ( defined(field.max) ) validators.push( Validators.max(field.max) )
    }
    else if ( field.designType === String ) {
        if ( defined(field.minLength) ) validators.push( Validators.maxLength(field.maxLength) )
        if ( defined(field.maxLength) ) validators.push( Validators.maxLength(field.maxLength) )
    }
    else if ( Array.isArray(field.designType) ) {
        if ( defined(field.minElements) ) validators.push( Validators.minElements(field.minElements) )
        if ( defined(field.maxElements) ) validators.push( Validators.minElements(field.maxElements) )
    }

    if ( field.validators ) {
        validators.push( ...field.validators )
    }

    return validators
}

export function getFieldValidator( field: FieldDescriptor ) {
    let validators: Function[] = getValidators(field)

    function fieldValidator(instance: any, value: any) {
        for ( let validator of validators ) {
            const errors = validator( value, instance )
            if ( errors ) {
                let valid = false
                let entries = Object.entries(errors)
                const [ token, message ] = entries[0]

                return {
                    valid,
                    error: {
                        token,
                        message
                    }
                }
            }
        }
        return { valid: true, error: undefined }
    }

    return fieldValidator
}

// private
export function validateField( instance: any, field: FieldDescriptor, value: any ) {
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
            const { valid, error } = validateModel(field.designType, value)
            if ( ! valid ) {
                return { valid, error }
            }
        }
    }

    return { valid: true, error: undefined }
}