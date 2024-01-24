import { FieldDescriptorParams } from "../../descriptors";
import { Choice, ChoiceFormatterFunction } from "../../types";
import { Model } from "../class/model";

/**
 * Use the @Choices decorator to denote which options should be available
 * for the given field
 */
export function Choices( choices: Array<Choice|any>, formatter?: ChoiceFormatterFunction ):any {

    const params: FieldDescriptorParams = { choices, widget: 'select' }
    if ( formatter ) params.choiceFormatter = formatter

    function Choices( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Choices decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Choices
}