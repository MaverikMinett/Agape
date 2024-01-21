

import { DeserializeOptions, SerializeOptions } from '../types'
import { Serializer } from './serializer'

export class StringSerializer extends Serializer {

    validateSerializedValue( value: any ) {
        let valid = true
        let error = undefined
        if ( ! (typeof value === 'string') ) {
            valid = false
            error = `Invalid data type: expected a string, received ${typeof value}`
        }
        return { valid, error }
    }

    deserializeValue(value: any, options?: DeserializeOptions) {
        return options?.trim ? value.trim() : value
    }

    serializeValue(value: any, options?: SerializeOptions) {
        return options?.trim ? value.trim() : value
    }

}