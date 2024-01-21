import { Class } from "@agape/types";
import { Model, ErrorReport, validate } from "@agape/model";
import { DeserializeOptions, SerializeOptions } from "./types";


import { Serializer } from './serializers/serializer'
import { DateSerializer } from "./serializers/date-serializer";
import { BooleanSerializer } from "./serializers/boolean-serializer";
import { StringSerializer } from "./serializers/string-serializer";
import { NumberSerializer } from "./serializers/number-serializer";
import { ObjectSerializer } from "./serializers/object-serializer";

export class Alchemy {

    private serializers = new Map<Class,Serializer>([
        [ Boolean, new BooleanSerializer ],
        [ Date, new DateSerializer ],
        [ Number, new NumberSerializer ],
        [ String, new StringSerializer ], 
        [ Object, new ObjectSerializer ]
    ])

    registerSerializer( type: Class, serializer: Class<Serializer> ) {
        const instance = new serializer()
        this.serializers.set(type, instance)
    }

    deserialize<T extends typeof Boolean>( type: T, input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: boolean } 
    deserialize<T extends typeof String>( type: T, input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: string }
    deserialize<T extends typeof Number>( type: T, input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: number }
    deserialize<T extends typeof Date>( type: T, input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: Date }
    deserialize<T extends Class>( type: T, input: any, options?: DeserializeOptions): { valid: boolean, error: ErrorReport<InstanceType<T>>, value: InstanceType<T> }
    deserialize<T extends typeof Boolean>( type: [T], input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: boolean[] } 
    deserialize<T extends typeof String>( type: [T], input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: string[] } 
    deserialize<T extends typeof Number>( type: [T], input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: number[] }
    deserialize<T extends typeof Date>( type: [T], input: any, options?: DeserializeOptions ): { valid: boolean, error: string, value: Date[] }
    deserialize<T extends Class>( type: [T], input: any, options?: DeserializeOptions): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>>,  value: Array<InstanceType<T>> }
    deserialize<T>( type: T|[T], input: any, options: DeserializeOptions={} ): any {
        {
            const { valid, error } = this.validateJson( type as any, input )
            if ( ! valid ) return { valid, error, value: undefined }
        }

        const value = this.deserializeValue( type as any, input, options )
        return { valid: true, error: undefined, value: value }
    }

    private deserializeValue<T extends typeof Boolean>( type: T, input: any, options?: DeserializeOptions ): boolean 
    private deserializeValue<T extends typeof String>( type: T, input: any, options?: DeserializeOptions ): string 
    private deserializeValue<T extends typeof Number>( type: T, input: any, options?: DeserializeOptions ): number 
    private deserializeValue<T extends typeof Date>( type: T, input: any, options?: DeserializeOptions ): Date 
    private deserializeValue<T extends Class>( type: T, input: any, options?: DeserializeOptions): InstanceType<T>
    private deserializeValue<T extends typeof Boolean>( type: [T], input: any, options?: DeserializeOptions ): boolean[]
    private deserializeValue<T extends typeof String>( type: [T], input: any, options?: DeserializeOptions ): string[]
    private deserializeValue<T extends typeof Number>( type: [T], input: any, options?: DeserializeOptions ): number[]
    private deserializeValue<T extends typeof Date>( type: [T], input: any, options?: DeserializeOptions ): Date[]
    private deserializeValue<T extends Class>( type: [T], input: any, options?: DeserializeOptions): Array<InstanceType<T>>
    private deserializeValue<T>( type: T|[T], input: any, options: DeserializeOptions={}): any {

        if ( input === null || input === undefined ) {
            return input
        }

        if ( Array.isArray(type) ) {
            const value = this.deserializeArray( type[0] as any, input as any[], options )
            return value
        }
        
        if ( this.serializers.has(type as Class) ) {
            const serializer = this.serializers.get(type as Class)
            const value = serializer.deserializeValue(input, options)
            return value
        }

        const descriptor = Model.descriptor(type as Class)
        if ( descriptor ) {
            const value = this.deserializeModel(type as Class, input, options)
            return value
        }

        throw new Error(`Cannot deserialize input of type ${(type as any).name}, don't know how`)
        
    }

    private deserializeArray<T extends typeof Boolean>( type: T, input: any[], options?: DeserializeOptions ): boolean[]
    private deserializeArray<T extends typeof String>( type: T, input: any[], options?: DeserializeOptions ): string[]
    private deserializeArray<T extends typeof Number>( type: T, input: any[], options?: DeserializeOptions ): number[]
    private deserializeArray<T extends typeof Date>( type: T, input: any[], options?: DeserializeOptions ): Date[]
    private deserializeArray<T extends Class>( type: T, input: any[], options?: DeserializeOptions): Array<InstanceType<T>>
    private deserializeArray<T>( type: T, input: any[], options: DeserializeOptions={} ): any[] {
        let value: any[] = []
        for ( let element of input ) {
            const deserializedElement = this.deserializeValue( type as any, element, options )
            value.push(deserializedElement)
        }
        return value
    }

    private deserializeModel<T extends Class>( type: T, input: any, options: DeserializeOptions={}): any {
        let value: any = {}

        const descriptor = Model.descriptor(type)

        const fields = descriptor.fields.all()

        for ( const field of fields ) {
            let jsonValue = input[field.name]
            if ( field.trim !== undefined ) options = {...options, trim: field.trim}
            value[field.name] = this.deserializeValue( field.designType as any, jsonValue, options )
        }

        return value
    }

    private validateJson<T extends typeof Boolean>( type: T, input: any ): { valid: boolean, error: string }
    private validateJson<T extends typeof String>( type: T, input: any ): { valid: boolean, error: string }
    private validateJson<T extends typeof Number>( type: T, input: any ): { valid: boolean, error: string }
    private validateJson<T extends typeof Date>( type: T, input: any ): { valid: boolean, error: string }
    private validateJson<T extends Class>( type: T, input: any): { valid: boolean, error: ErrorReport<InstanceType<T>> }
    private validateJson<T extends typeof Boolean>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateJson<T extends typeof String>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateJson<T extends typeof Number>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateJson<T extends typeof Date>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateJson<T extends Class>( type: [T], input: any): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>> }
    private validateJson<T>( type: T|[T], input: any ): { valid: boolean, error: any } {
        let { valid, error } = this.validateSerializedValue( type as any, input )
        return { valid, error }
    }

    private validateSerializedValue<T extends typeof Boolean>( type: T, input: any ): { valid: boolean, error: string }
    private validateSerializedValue<T extends typeof String>( type: T, input: any ): { valid: boolean, error: string }
    private validateSerializedValue<T extends typeof Number>( type: T, input: any ): { valid: boolean, error: string }
    private validateSerializedValue<T extends typeof Date>( type: T, input: any ): { valid: boolean, error: string }
    private validateSerializedValue<T extends Class>( type: T, input: any): { valid: boolean, error: ErrorReport<InstanceType<T>> }
    private validateSerializedValue<T extends typeof Boolean>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateSerializedValue<T extends typeof String>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateSerializedValue<T extends typeof Number>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateSerializedValue<T extends typeof Date>( type: [T], input: any ): { valid: boolean, error: string[] }
    private validateSerializedValue<T extends Class>( type: [T], input: any): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>> }
    private validateSerializedValue<T>( type: T|[T], input: any ): { valid: boolean, error: any } {

        if ( input === null || input === undefined ) {
            return { valid: true, error: undefined }
        }

        if ( Array.isArray(type) ) {
            if ( ! Array.isArray(input) ) {
                return { 
                    valid: false,
                    error: `Invalid data type: expected array received ${typeof input}`
                }
            }
            const { valid, error } = this.validateSerializedArray( type[0] as any, input as any[] )
            if ( ! valid ) return { valid, error }
        }
        
        if ( this.serializers.has(type as Class) ) {
            const serializer = this.serializers.get(type as Class)
            const { valid, error } = serializer.validateSerializedValue( input as any )
            if ( ! valid ) return { valid, error }
        }

        const descriptor = Model.descriptor(type as Class)
        if ( descriptor ) {
            if ( typeof input !== 'object' ) {
                return { 
                    valid: false,
                    error: `Invalid data type: expected an object, received ${typeof input}`
                }
            }
            const { valid, error } = this.validateSerializedModel(type as Class, input)
            if ( ! valid ) return { valid, error }
        }

        return { valid: true, error: undefined }
    }

    private validateSerializedArray<T extends typeof Boolean>( type: T, input: any[] ): { valid: boolean, error: string[] }
    private validateSerializedArray<T extends typeof String>( type: T, input: any[] ): { valid: boolean, error: string[] }
    private validateSerializedArray<T extends typeof Number>( type: T, input: any[] ): { valid: boolean, error: string[] }
    private validateSerializedArray<T extends typeof Date>( type: T, input: any[] ): { valid: boolean, error: string[] }
    private validateSerializedArray<T extends Class>( type: T, input: any[]): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>> }
    private validateSerializedArray<T>( type: T, input: any[] ): { valid: boolean, error: any[] } {
        let arrayValid = true
        let arrayError: any[] = []
        for ( let element of input ) {
            const { valid, error } = this.validateSerializedValue( type as any, element )
            if ( ! valid ) {
                arrayValid = false
            }
            arrayError.push(error)
        }
        return { valid: arrayValid, error: arrayValid ? undefined : arrayError }
    }

    private validateSerializedModel<T extends Class>( type: T, input: any): any {
        let modelValid: boolean = true
        let modelError: any = {}

        const descriptor = Model.descriptor(type)

        // verify that all properties present are valid fields
        for ( let property of Object.keys(input) ) {
            if ( ! descriptor.fields.has(property) ) {
                modelValid = false
                modelError[property] = `Invalid field`
                continue
            }

            const field = descriptor.fields.get(property)

            if ( field.required ) {
                const inputValue = input[property]
                if ( inputValue === undefined || inputValue === null || inputValue === '' ) {
                    modelValid = false
                    modelError[property] = `Field is required`
                    continue
                }
            }

            const { valid, error } = this.validateSerializedValue(field.designType as any, input[property])
            if ( ! valid ) {
                modelValid = false
                modelError[property] = error
            }
        }

        for ( const field of descriptor.fields.all() ) {
            if ( field.optional ) {
                continue
            }
            else if ( ! (field.name in input) ) {
                modelValid = false
                modelError[field.name] = `Field is missing`
            } 
        }

        return { valid: modelValid, error: modelError }
    }

    serialize<T extends typeof Boolean>( type: T, input: boolean, options?: SerializeOptions ): any
    serialize<T extends typeof String>( type: T, input: string, options?: SerializeOptions ): any
    serialize<T extends typeof Number>( type: T, input: number, options?: SerializeOptions ): any
    serialize<T extends typeof Date>( type: T, input: Date, options?: SerializeOptions ): any
    serialize<T extends Class>( type: T, input: InstanceType<T>, options?: SerializeOptions ): any
    serialize<T extends typeof Boolean>( type: [T], input: boolean[], options?: SerializeOptions ): any[]
    serialize<T extends typeof String>( type: [T], input: string[], options?: SerializeOptions ): any[]
    serialize<T extends typeof Number>( type: [T], input: number[], options?: SerializeOptions ): any[]
    serialize<T extends typeof Date>( type: [T], input: Date[], options?: SerializeOptions ): any[]
    serialize<T extends Class>( type: [T], input: InstanceType<T>[], options?: SerializeOptions ): any[]
    serialize<T>( type: T, input: any, options: SerializeOptions = {} ): any {
        const value = this.serializeValue( type as any, input )
        return value
    }

    private serializeValue<T extends typeof Boolean>( type: T, input: boolean, options?: SerializeOptions ): any
    private serializeValue<T extends typeof String>( type: T, input: string, options?: SerializeOptions ): any
    private serializeValue<T extends typeof Number>( type: T, input: number, options?: SerializeOptions ): any
    private serializeValue<T extends typeof Date>( type: T, input: Date, options?: SerializeOptions ): any
    private serializeValue<T extends Class>( type: T, input: InstanceType<T>, options?: SerializeOptions ): any
    private serializeValue<T extends typeof Boolean>( type: [T], input: boolean, options?: SerializeOptions ): any[]
    private serializeValue<T extends typeof String>( type: [T], input: string, options?: SerializeOptions ): any[]
    private serializeValue<T extends typeof Number>( type: [T], input: number, options?: SerializeOptions ): any[]
    private serializeValue<T extends typeof Date>( type: [T], input: Date, options?: SerializeOptions ): any[]
    private serializeValue<T extends Class>( type: [T], input: InstanceType<T>, options?: SerializeOptions ): any[]
    private serializeValue<T>( type: T, input: any, options: SerializeOptions = {} ): any {

        if ( input === null || input === undefined ) {
            return input
        }

        if ( Array.isArray(type) ) {
            const value = this.serializeArray( type[0] as any, input as any[] )
            return value
        }
        
        if ( this.serializers.has(type as Class) ) {
            const serializer = this.serializers.get(type as Class)
            const value = serializer.serializeValue(input, options)
            return value
        }

        const descriptor = Model.descriptor(type as Class)

        if ( descriptor ) {
            const value = this.serializeModel(type as Class, input)
            return value
        }

        throw new Error(`Cannot serialize input of type ${(type as any).name}, don't know how`)
    }

    private serializeArray<T extends typeof Boolean>( type: T, input: boolean[], options?: SerializeOptions ): boolean[]
    private serializeArray<T extends typeof String>( type: T, input: string[], options?: SerializeOptions ): string[]
    private serializeArray<T extends typeof Number>( type: T, input: number[], options?: SerializeOptions ): number[]
    private serializeArray<T extends typeof Date>( type: T, input: Date[], options?: SerializeOptions ): Date[]
    private serializeArray<T extends Class>( type: T, input: InstanceType<T>[], options?: SerializeOptions ): any[]
    private serializeArray<T>( type: T, input: any[], options: SerializeOptions = {}): any[] {
        let value: any[] = []
        for ( let element of input ) {
            const serializedElement = this.serializeValue( type as any, element )
            value.push(serializedElement)
        }
        return value
    }

    private serializeModel<T extends Class>( type: T, input: InstanceType<T>, options: SerializeOptions = {}): any {
        let value: any = {}

        const descriptor = Model.descriptor(type)

        const fields = descriptor.fields.all()

        for ( const field of fields ) {
            // do not include optional inputs which do not exist in the model
            if ( field.optional && !(field.name in input) ) {
                continue
            }
            else {
                let fieldValue = input[field.name]
                value[field.name] = this.serializeValue( field.designType as any, fieldValue, options )
            }
        }

        return value
    }

    private validate<T extends typeof Boolean>( type: T, input: any): { valid: boolean, error: string } 
    private validate<T extends typeof String>( type: T, input: any): { valid: boolean, error: string }
    private validate<T extends typeof Number>( type: T, input: any): { valid: boolean, error: string }
    private validate<T extends typeof Date>( type: T, input: any): { valid: boolean, error: string }
    private validate<T extends Class>( type: T, input: any): { valid: boolean, error: ErrorReport<InstanceType<T>> }
    private validate<T extends typeof Boolean>( type: [T], input: any): { valid: boolean, error: string } 
    private validate<T extends typeof String>( type: [T], input: any): { valid: boolean, error: string } 
    private validate<T extends typeof Number>( type: [T], input: any): { valid: boolean, error: string }
    private validate<T extends typeof Date>( type: [T], input: any): { valid: boolean, error: string }
    private validate<T extends Class>( type: [T], input: any): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>> }
    private validate<T>( type: [T], input: any): { valid: boolean, error: any } {
        // only validate models
        if ( typeof type === 'function' && (type as any).prototype && Model.descriptor(type as any) ) {
            const { valid, error } = validate( type as any, input as any )
            return { valid, error }
        }
        // everything else is valid
        else {
            return { valid: true, error: undefined }
        }
    }

}