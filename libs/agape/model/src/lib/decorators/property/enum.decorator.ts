import { FieldDescriptorParams } from "../../descriptors"
import { Model } from "../class/model"


export function Enum( set: object, params?: FieldDescriptorParams):any {


    function Enum( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Choices decorator on a method")

        let model = Model.descriptor(target, true)

        params ??= {}
        params.enum = set

        model.field(name).assign(params)
    }

    return Enum
}