

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

    deserializeValue(value: any) {
        return value
    }

}