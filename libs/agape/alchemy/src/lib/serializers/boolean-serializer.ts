
import { DeserializeOptions, SerializeOptions } from "../types"
import { Serializer } from "./serializer"

export class BooleanSerializer extends Serializer {

    validateSerializedValue( value: any ) {
        let valid = true
        let error = undefined
        if ( ! (typeof value === 'boolean') ) {
            valid = false
            error = `Invalid data type: expected a boolean, received ${typeof value}`
        }
        return { valid, error }
    }

    deserializeValue(value: any, options?: DeserializeOptions) {
        return value
    }

    serializeValue(value: any, options?: SerializeOptions) {
        return value
    }

}