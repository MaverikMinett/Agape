import { Class } from "@agape/types";
import { FieldDescriptorParams } from "../../descriptors";
import { Model } from "../class/model";


interface ArrayDesignTypeParams {
    minElements: number,
    maxElements: number
}

export function DesignType( designType: Boolean|Date|Number|String|Class ): any
export function DesignType( designType: [Boolean]|[Date]|[Number]|[String]|[Class] ): any
export function DesignType( designType: Boolean|Date|Number|String|Class|[Boolean]|[Date]|[Number]|[String]|[Class] ): any {

    const params: FieldDescriptorParams = {
        designType
     }

    function DesignType( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the DesignType decorator on a method")

        const model = Model.descriptor(target, true)

        const field = model.field(name)

        field.assign(params)
    }

    return DesignType

}