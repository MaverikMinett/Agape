
import { DeserializeOptions, SerializeOptions } from '../types'
import { Serializer } from './serializer'

export class NumberSerializer extends Serializer {

    validateSerializedValue( value: any ) {
        let valid = true
        let error = undefined
        if ( ! (typeof value === 'number') ) {
            valid = false
            error = `Invalid data type: expected a number, received ${typeof value}`
        }
        return { valid, error }
    }

    deserializeValue(value: any, options?: DeserializeOptions) {
        return value
    }

    serializeValue(value: any, options?: SerializeOptions) {
        return value
    }

    // validateField() {
    //     if ( field.min !== undefined && field.min !== null && value < field.min ) {
    //         valid = false
    //         error = `Value is less than minimum value of ${field.min}`
    //     }
    //     else if ( field.max !== undefined && field.max !== null && value > field.max ) {
    //         valid = false
    //         error = `Value is greater than maximum value of ${field.min}`
    //     }
    // }
}