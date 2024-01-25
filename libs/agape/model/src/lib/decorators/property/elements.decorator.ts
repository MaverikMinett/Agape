


import { Class } from "@agape/types";
import { ElementDescriptorParams, FieldDescriptorParams } from "../../descriptors";
import { Model} from "../class/model";
import { determineEnumDesignType } from "../../util";

/**
 * Use the @Choices decorator to denote which options should be available
 * for the given field
 */
export function Elements( designType: object, parameters?: ElementDescriptorParams ):any 
export function Elements( designType: Boolean|Date|Number|String|Class, parameters?: ElementDescriptorParams ):any 
export function Elements( type: object|Boolean|Date|Number|String|Class, parameters?: ElementDescriptorParams ):any 
{

    let elementDescriptorParams: ElementDescriptorParams = parameters ?? { }

    let designType: Boolean|Date|Number|String|Class
    if ( typeof type === 'object' ) {
        designType = determineEnumDesignType(type)
        elementDescriptorParams['enum'] = type
    }
    else {
        designType = type
    }

    const fieldDescriptorParams: FieldDescriptorParams = {
        elements: elementDescriptorParams,
        designType: [designType] 
    }

    function Elements( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Elements decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(fieldDescriptorParams)
    }

    return Elements
}