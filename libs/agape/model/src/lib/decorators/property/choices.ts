import { Choice } from "../../types";
import { Model } from "../class/model";

/**
 * Use the @Choices decorator to denote which options should be available
 * for the given field
 */
export function Choices( choices: Choice[] ):any {

    const params = { choices }

    function Choices( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Choices decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Choices
}