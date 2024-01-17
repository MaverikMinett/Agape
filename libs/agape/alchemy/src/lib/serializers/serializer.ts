import { FieldDescriptor } from "@agape/model"
import { Class } from "@agape/types"

export abstract class Serializer {

    // abstract type: Class

    abstract validateSerializedValue( value: any ): {valid: boolean, error: string}

    abstract deserializeValue( value: any ): any

    // abstract validateDeserializedField( value: number, field: FieldDescriptor ): {valid: boolean, error: string} 
}

