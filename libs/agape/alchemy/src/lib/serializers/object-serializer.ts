
import { Serializer } from './serializer'

export class ObjectSerializer extends Serializer {

    validateSerializedValue( value: any ) {
        let valid = true
        let error = undefined
        if ( ! (typeof value === 'object') ) {
            valid = false
            error = `Invalid data type: expected a object, received ${typeof value}`
        }
        return { valid, error }
    }

    deserializeValue(value: any) {
        return JSON.parse(JSON.stringify(value))
    }

    serializeValue(value: any) {
        return JSON.parse(JSON.stringify(value))
    }

}