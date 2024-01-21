import { FieldDescriptor } from "@agape/model"
import { Class } from "@agape/types"
import { DeserializeOptions, SerializeOptions } from "../types"

export abstract class Serializer {

    abstract validateSerializedValue( value: any ): {valid: boolean, error: string}

    abstract deserializeValue( value: any, options?: DeserializeOptions ): any

    abstract serializeValue( value: any, options?: SerializeOptions ): any

}

