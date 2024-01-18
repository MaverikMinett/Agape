import { Class } from "@agape/types";
import { Model } from "@agape/model";
import { ErrorReport } from "./types";


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

    deserialize<T extends typeof Boolean>( type: T, input: any ): { valid: boolean, error: string, value: boolean } 
    deserialize<T extends typeof String>( type: T, input: any ): { valid: boolean, error: string, value: string }
    deserialize<T extends typeof Number>( type: T, input: any ): { valid: boolean, error: string, value: number }
    deserialize<T extends typeof Date>( type: T, input: any ): { valid: boolean, error: string, value: Date }
    deserialize<T extends Class>( type: T, input: any): { valid: boolean, error: ErrorReport<InstanceType<T>>, value: InstanceType<T> }
    deserialize<T extends typeof Boolean>( type: [T], input: any ): { valid: boolean, error: string, value: boolean[] } 
    deserialize<T extends typeof String>( type: [T], input: any ): { valid: boolean, error: string, value: string[] } 
    deserialize<T extends typeof Number>( type: [T], input: any ): { valid: boolean, error: string, value: number[] }
    deserialize<T extends typeof Date>( type: [T], input: any ): { valid: boolean, error: string, value: Date[] }
    deserialize<T extends Class>( type: [T], input: any): { valid: boolean, error: ErrorReport<Array<InstanceType<T>>>,  value: Array<InstanceType<T>> }
    deserialize<T>( type: T|[T], input: any ): any {
        {
            const { valid, error } = this.validateJson( type as any, input )
            if ( ! valid ) return { valid, error, value: undefined }
        }

        const value = this.deserializeValue( type as any, input )
        return { valid: true, error: undefined, value: value }
    }

    private deserializeValue<T extends typeof Boolean>( type: T, input: any ): boolean 
    private deserializeValue<T extends typeof String>( type: T, input: any ): string 
    private deserializeValue<T extends typeof Number>( type: T, input: any ): number 
    private deserializeValue<T extends typeof Date>( type: T, input: any ): Date 
    private deserializeValue<T extends Class>( type: T, input: any): InstanceType<T>
    private deserializeValue<T extends typeof Boolean>( type: [T], input: any ): boolean[]
    private deserializeValue<T extends typeof String>( type: [T], input: any ): string[]
    private deserializeValue<T extends typeof Number>( type: [T], input: any ): number[]
    private deserializeValue<T extends typeof Date>( type: [T], input: any ): Date[]
    private deserializeValue<T extends Class>( type: [T], input: any): Array<InstanceType<T>>
    private deserializeValue<T>( type: T|[T], input: any ): any {

        if ( input === null || input === undefined ) {
            return input
        }

        if ( Array.isArray(type) ) {
            const value = this.deserializeArray( type[0] as any, input as any[] )
            return value
        }
        
        if ( this.serializers.has(type as Class) ) {
            const serializer = this.serializers.get(type as Class)
            const value = serializer.deserializeValue(input)
            return value
        }

        const descriptor = Model.descriptor(type as Class)
        if ( descriptor ) {
            const value = this.deserializeModel(type as Class, input)
            return value
        }

        throw new Error(`Cannot deserialize input of type ${(type as any).name}, don't know how`)
        
    }

    private deserializeArray<T extends typeof Boolean>( type: T, input: any[] ): boolean[]
    private deserializeArray<T extends typeof String>( type: T, input: any[] ): string[]
    private deserializeArray<T extends typeof Number>( type: T, input: any[] ): number[]
    private deserializeArray<T extends typeof Date>( type: T, input: any[] ): Date[]
    private deserializeArray<T extends Class>( type: T, input: any[]): Array<InstanceType<T>>
    private deserializeArray<T>( type: T, input: any[] ): any[] {
        let value: any[] = []
        for ( let element of input ) {
            const deserializedElement = this.deserializeValue( type as any, element )
            value.push(deserializedElement)
        }
        return value
    }

    private deserializeModel<T extends Class>( type: T, input: any): any {
        let value: any = {}

        const descriptor = Model.descriptor(type)

        const fields = descriptor.fields.all()

        for ( const field of fields ) {
            let jsonValue = input[field.name]
            value[field.name] = this.deserializeValue( field.designType as any, jsonValue )
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

    serialize<T extends typeof Boolean>( type: T, value: boolean ): any
    serialize<T extends typeof String>( type: T, value: string ): any
    serialize<T extends typeof Number>( type: T, value: number ): any
    serialize<T extends typeof Date>( type: T, value: Date ): any
    serialize<T extends Class>( type: T, value: InstanceType<T> ): any
    serialize<T extends typeof Boolean>( type: [T], value: boolean[] ): any[]
    serialize<T extends typeof String>( type: [T], value: string[] ): any[]
    serialize<T extends typeof Number>( type: [T], value: number[] ): any[]
    serialize<T extends typeof Date>( type: [T], value: Date[] ): any[]
    serialize<T extends Class>( type: [T], value: InstanceType<T>[] ): any[]
    serialize<T>( type: T, value: any ): any {
        const output = this.serializeValue( type as any, value )
        return output
    }

    private serializeValue<T extends typeof Boolean>( type: T, value: boolean ): any
    private serializeValue<T extends typeof String>( type: T, value: string ): any
    private serializeValue<T extends typeof Number>( type: T, value: number ): any
    private serializeValue<T extends typeof Date>( type: T, value: Date ): any
    private serializeValue<T extends Class>( type: T, value: InstanceType<T> ): any
    private serializeValue<T extends typeof Boolean>( type: [T], value: boolean ): any[]
    private serializeValue<T extends typeof String>( type: [T], value: string ): any[]
    private serializeValue<T extends typeof Number>( type: [T], value: number ): any[]
    private serializeValue<T extends typeof Date>( type: [T], value: Date ): any[]
    private serializeValue<T extends Class>( type: [T], value: InstanceType<T> ): any[]
    private serializeValue<T>( type: T, value: any ): any {

        if ( value === null || value === undefined ) {
            return value
        }

        if ( Array.isArray(type) ) {
            const output = this.serializeArray( type[0] as any, value as any[] )
            return output
        }
        
        if ( this.serializers.has(type as Class) ) {
            const serializer = this.serializers.get(type as Class)
            const output = serializer.serializeValue(value)
            return output
        }

        const descriptor = Model.descriptor(type as Class)

        if ( descriptor ) {
            const output = this.serializeModel(type as Class, value)
            return output
        }

        throw new Error(`Cannot serialize value of type ${(type as any).name}, don't know how`)
    }

    private serializeArray<T extends typeof Boolean>( type: T, value: boolean[] ): boolean[]
    private serializeArray<T extends typeof String>( type: T, value: string[] ): string[]
    private serializeArray<T extends typeof Number>( type: T, value: number[] ): number[]
    private serializeArray<T extends typeof Date>( type: T, value: Date[] ): Date[]
    private serializeArray<T extends Class>( type: T, value: InstanceType<T>[] ): any[]
    private serializeArray<T>( type: T, value: any[] ): any[] {
        let output: any[] = []
        for ( let element of value ) {
            const serializedElement = this.serializeValue( type as any, element )
            output.push(serializedElement)
        }
        return output
    }

    private serializeModel<T extends Class>( type: T, value: InstanceType<T>): any {
        let output: any = {}

        const descriptor = Model.descriptor(type)

        

        const fields = descriptor.fields.all()

        for ( const field of fields ) {
            // do not include optional values which do not exist in the model
            if ( field.optional && !(field.name in value) ) {
                continue
            }
            else {
                let fieldValue = value[field.name]
                output[field.name] = this.serializeValue( field.designType as any, fieldValue )
            }
        }

        return output
    }



    // validateJson<T extends Class>( model: T, json: any ): { valid: boolean, error: any }
    // validateJson<T extends Class>( model: [T], json: any ): { valid: boolean, error: any }
    // validateJson<T extends Class>( model: T|[T], json: any ): { valid: boolean, error: any } {
    //     const { valid, error } = this.validateSerializedValue( json, model )
    //     return { valid, error }
    // }

    // deserialize<T extends Class>( model: T, json: any ) {
    //     let valid: boolean;
    //     let error: any;
    //     let value: any
    //     ({ valid, error } = this.validateJson(model, json))

    //     if ( ! valid ) {
    //         return { valid, error, value }
    //     }

    //     ({ valid, error, value } = this.deserializeJson(model, json))

    //     if ( ! valid ) {
    //         return { valid, error, value }
    //     }

    //     if ( Model.descriptor(model) ) {
    //         ( { valid, error } = this.validateDeserializedModel( model, value ))
    //         if ( ! valid ) value = undefined
    //     }

    //     return { valid, error, value }
    // }

    // deserializeJson<T extends Class>( model: T, json: any ): { valid: boolean, error: any, value: InstanceType<T> }
    // deserializeJson<T extends Class>( model: [T], json: any ): { valid: boolean, error: any, value: InstanceType<T>[] }
    // deserializeJson<T extends Class>( model: T|[T], json: any ): { valid: boolean, error: any, value: InstanceType<T>|InstanceType<T>[] } {
    //     const {valid, error, value} = this.deserializeValue( json, model )
    //     return {valid, error, value}
    // }

    // private deserializeValue( jsonValue: any, type: Number|Boolean|String|Date|Class|Array<Number|Boolean|String|Date|Class> ) {
    //     let valid: boolean = true
    //     let error: string|Array<any>|ErrorReport<any>
    //     let value: any
    
    //     if ( type === Number || type === Boolean || type === String ) {
    //         value = jsonValue
    //     }
    //     else if ( Array.isArray(type) ) {
    //         ({ valid, error, value}= this.deserializeJsonArray(jsonValue, type[0]))
    //     }
    //     else if ( typeof type === 'function' && type.prototype ) {
    //         const descriptor = Model.descriptor(type)
    //         if ( descriptor ) {
    //             ({ valid, error, value } = this.deserializeJsonModel( type, jsonValue ))
    //         }
    //         else if ( this.serializers.has(type) ) {
    //             const serializer = this.serializers.get(type);
    //             ({valid, error, value} = serializer.deserializeValue(jsonValue))
    //         }
    //         else  {
    //             valid = false
    //             error = 'Cannot validate unknown object'
    //         }
    //     }
    //     else {
    //         error = `Unknown data type ${typeof value}`
    //     }
    
    //     return { valid, error, value }
    // }

    /**
     * Run after deserializing a model, will perform validation checks
     * such as min, max, and validators on model fields. Does not check
     * data types or existence/non-existence of optiona/required fields
     * since we are expecting valid data from json which was validated.
     * 
     * Use validateModel to perform complete checks
     * 
     * @param model 
     * @param instance 
     * @returns 
     */
    // validateDeserializedModel<T extends Class>( model: T, instance: InstanceType<T> ): { valid: boolean, error: ErrorReport<InstanceType<T>> } {
    //     let valid: boolean = true

    //     class Foo {
    //         bar: 'string'
    //     }

    //     let errors: any = {}
    
    //     const descriptor = Model.descriptor(model)
    
    //     const fields = descriptor.fields.all() 

    //     for ( const field of fields ) {

    //         let exists = field.name in instance

    //         if ( exists ) {
    //             let value = instance[field.name]

    //             const fieldValidation = this.validateDeserializedField( instance, field )
    
    //             if ( fieldValidation.valid === false ) {
    //                 errors[field.name] = fieldValidation.error
    //                 valid = false
    //             }
    //         }
            
    //     }
    
    //     return {valid, error: errors}
    // }

    // private validateDeserializedField( instance: any, field: FieldDescriptor ) {
    //     let valid: boolean = true
    //     let error: string|Array<any>|ErrorReport<any>

    //     const type = field.designType
    //     const value = instance[field.name]

    //     /* don't check null or undefined values */
    //     if ( value === null && value === undefined ) {
    //         valid = true
    //         return { valid, error }
    //     }

    //     if ( type === Number ) {
    //         if ( field.min !== undefined && field.min !== null && value < field.min ) {
    //             valid = false
    //             error = `Value is less than minimum value of ${field.min}`
    //         }
    //         else if ( field.max !== undefined && field.max !== null && value > field.max ) {
    //             valid = false
    //             error = `Value is greater than maximum value of ${field.min}`
    //         }
    //     }
    //     else if ( type === Boolean )  {
    //        valid = true
    //     }
    //     else if ( type === String ) {
    //         if ( field.min !== undefined && field.min !== null && value.length < field.min ) {
    //             valid = false
    //             error = `String does meet minimum length of ${field.min} characters`
    //         }
    //         else if ( field.max !== undefined && field.max !== null && value.length > field.max ) {
    //             valid = false
    //             error = `String exceeds maximum length of ${field.min} characters`
    //         }
    //     }
    //     else if ( Array.isArray(type) ) {
    //         if ( field.min !== undefined && field.min !== null && value.length < field.min ) {
    //             valid = false
    //             error = `Array does meet minimum length of ${field.min} characters`
    //         }
    //         else if ( field.max !== undefined && field.max !== null && value.length > field.max ) {
    //             valid = false
    //             error = `Array exceeds maximum length of ${field.min} characters`
    //         }
    //         else {
    //             ({ valid, error } = this.validateDeserializedArray( value, type[0] ))
    //         }

    //     }
    //     else if ( typeof type === 'function' && type.prototype ) {
    //         const descriptor = Model.descriptor(type)
    //         // validate child models
    //         if ( descriptor ) {
    //             ({ valid, error } = this.validateDeserializedModel( type, value ))
    //         }
    //         // validate other types of objects
    //         else if ( this.serializers.has(type) ) {
    //             const serializer = this.serializers.get(type);
    //             ({valid, error} = serializer.validateDeserializedField(instance, field))
    //         }
    //         else  {
    //             valid = false
    //             error = 'Cannot validate unknown object'
    //         }
    //     }
    //     else {
    //         error = `Unknown data type ${typeof value}`
    //     }

    //     return { valid, error }
    // }

    // private validateDeserializedArray( array: any[], type: Number|Boolean|String|Class|Date|Array<Number|Boolean|String|Class|Date> ) {
    //     let valid: boolean = true
    //     const error: any[] = []

    //     for ( const value of array ) {
    //         const itemValidation = this.validateDesrializedValue( value, type )
    //         if ( itemValidation.valid === false ) {
    //             valid = false
    //         }
    //         error.push(itemValidation.error)
    //     }
    //     return {valid, error }
    // }

    
    // private validateDesrializedValue( value: any, type: Number|Boolean|String|Class|Date|Array<Number|Boolean|String|Class|Date>  ) {
    //     let valid: boolean = false
    //     let error: string|Array<any>|ErrorReport<any>
    
    //     if ( type === Number ) {
    //         typeof value === 'number'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a number'
    //     }
    //     else if ( type === Boolean )  {
    //         typeof value === 'boolean'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a boolean' 
    //     }
    //     else if ( type === String ) {
    //         typeof value === 'string'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a string'
    //     }
    //     else if ( Array.isArray(type) ) {
    //         ({ valid, error } = this.validateDeserializedArray(value, type[0]))
    //     }
    //     else if ( typeof type === 'function' && type.prototype ) {
    //         const descriptor = Model.descriptor(type)
    //         if ( descriptor ) {
    //             ({ valid, error } = this.validateDeserializedModel( type, value ))
    //         }
    //         else  {
    //             if ( value instanceof type ) {
    //                 valid = true
    //             }
    //             else {
    //                 valid = false
    //                 error = `Expected ${value} to be of type ${type.name}`
    //             }
    //         }
    //     }
    //     else {
    //         error = `Unknown data type ${typeof value}`
    //     }
    
    //     return { valid, error }
    // }
        



    // private deserializeJsonModel<T extends Class>( model: T, json: any ) {
    //     let valid: boolean = true

    //     let errors: any = { }

    //     let instance: any = { }
    
    //     const descriptor = Model.descriptor(model)
    
    //     const fields = descriptor.fields.all()

    //     for ( const field of fields ) {
    //         let jsonValue = json[field.name]
    //         const result = this.deserializeValue( jsonValue, field.designType )
    //         if ( result.valid ) {
    //             instance[field.name] = result.value
    //         }
    //         else {
    //             valid = false
    //             errors[field.name] = result.error
    //         }
    //     }

    //     return { valid, error: errors, value: instance } as 
    //         { valid: boolean, error: ErrorReport<InstanceType<T>>, value: InstanceType<T> }
    // }

    

    // private deserializeJsonArray( array: any[], type: Number|Boolean|String|Date|Class|Array<Number|Boolean|String|Date|Class> ) {
    //     let valid: boolean = true
    //     let error: any[] = []
    //     let value: any = []

    //     if ( type === Number || type === String || type === Boolean ) {
    //         value = [...array]
    //     }
    //     else {
    //         for ( const value of array ) {
    //             const result = this.deserializeValue( value, type )
    //             if ( ! result.valid ) {
    //                 error.push(result.error)
    //             }
    //             value.push(result.value)
    //         }
    //     }

    //     if ( valid ) {
    //         error = undefined
    //     }

    //     return {valid, error, value}
    // }


    // private validateJsonModel<T extends Class>(model: T, json: any) {
    //     let valid: boolean = true

    //     let errors: ErrorReport<T> = { }
    
    //     const descriptor = Model.descriptor(model)
    
    //     const fields = descriptor.fields.all()
    
    //     for ( const field of fields ) {
            
    //         const exists = field.name in json
    
    //         if ( ! exists && ! field.optional ) {
    //             const error = 'This field is required'
    //             errors[field.name] = error
    //             valid = false
    //         }
    //         else {
    //             let value = json[field.name]
    
    //             const fieldValidation = this.validateSerializedValue( value, field.designType )
    //             if ( fieldValidation.valid === false ) {
    //                 errors[field.name] = fieldValidation.error
    //                 valid = false
    //             }
    //         }
    //     }
    
    //     return {valid, error: errors}
    // }

    // private validateJsonArray( json: any, type: Number|Boolean|String|Class|Date|Array<Number|Boolean|String|Class|Date> ) {
    //     let valid: boolean = true
    //     let error: any[]|string
    //     if ( ! Array.isArray(json) ) {
    //         valid = false
    //         error = 'Invalid data type, expected an array'
    //     }
    //     else {
    //         error = []
    //         for ( const value of json ) {
    //             const itemValidation = this.validateSerializedValue( value, type )
    //             if ( itemValidation.valid === false ) {
    //                 valid = false
    //             }
    //             error.push(itemValidation.error)
    //         }
    //     }

    //     return {valid, error }
    // }

    // private validateSerializedValue( value: any, type: Number|Boolean|String|Class|Date|Array<Number|Boolean|String|Class|Date> ) {
    //     let valid: boolean = false
    //     let error: string|Array<any>|ErrorReport<any>
    
    //     if ( type === Number ) {
    //         typeof value === 'number'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a number'
    //     }
    //     else if ( type === Boolean )  {
    //         typeof value === 'boolean'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a boolean' 
    //     }
    //     else if ( type === String ) {
    //         typeof value === 'string'
    //             ? valid = true
    //             : error = 'Invalid data type, expected a string'
    //     }
    //     else if ( Array.isArray(type) ) {
    //         ({ valid, error } = this.validateJsonArray(value, type[0]))
    //     }
    //     else if ( typeof type === 'function' && type.prototype ) {
    //         const descriptor = Model.descriptor(type)
    //         if ( descriptor ) {
    //             ({ valid, error } = this.validateJsonModel( type, value ))
    //         }
    //         else if ( this.serializers.has(type) ) {
    //             const serializer = this.serializers.get(type);
    //             ({valid, error} = serializer.validateSerializedValue(value))
    //         }
    //         else  {
    //             valid = false
    //             error = 'Cannot validate unknown object'
    //         }
    //     }
    //     else {
    //         error = `Unknown data type ${typeof value}`
    //     }
    
    //     return { valid, error }
    // }
}