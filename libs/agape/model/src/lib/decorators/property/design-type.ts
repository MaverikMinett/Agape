import { Class } from "@agape/types";
import { FieldDescriptorParams } from "../../descriptors";


interface ArrayDesignTypeParams {
    minElements: number,
    maxElements: number
}

export function DesignType( designType: Boolean|Date|Number|String|Class ): any
export function DesignType( designType: [Boolean]|[Date]|[Number]|[String]|[Class], params?: ArrayDesignTypeParams ): any
export function DesignType( designType: Boolean|Date|Number|String|Class|[Boolean]|[Date]|[Number]|[String]|[Class], params?: FieldDescriptorParams ): any {

    const params = 

}