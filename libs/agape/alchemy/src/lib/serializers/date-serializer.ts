
import { Serializer } from "./serializer"

const isoDateFormatRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/

export class DateSerializer extends Serializer {


    validateSerializedValue( value: any )  {
        let valid: boolean = true
        let error: string

        if ( typeof value != 'string' ) {
            valid = false
            error = `Invalid data type: expected a date as an iso string, received ${typeof value}`
        }
        else if ( ! isoDateFormatRegex.test( value ) ) {
            valid = false
            error = 'Invalid date'
        }

        return { valid, error }
    }

    deserializeValue( jsonValue: string ) {
        let valid: boolean = true
        let value: Date
        let error: string

        value = new Date(jsonValue) 

        return value

        // if ( value.toString() === 'Invalid Date') {
        //     valid = false
        //     error = "Invalid date"
        //     value = undefined
        // }

        // return {valid, error, value}
    }

    // validateDeserializedField( value: any, field: FieldDescriptor ) {
    //     let error = undefined
    //     let valid = true
    // }

    // validateDeserializedField( instance: any, field: FieldDescriptor ) {
    //     let valid: boolean = true
    //     let error: string
    //     const value = instance[field.name]
    //     if ( field.min !== undefined && field.min !== null && value < field.min ) {
    //         valid = false
    //         error = `Date is before minimum date of ${field.min.toString()}`
    //     }
    //     else if ( field.max !== undefined && field.max !== null && value > field.max ) {
    //         valid = false
    //         error = `Date is after maximum date of ${field.max.toString()}`
    //     }
    //     return { valid, error }
    // }

}

