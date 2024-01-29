import { FieldDescriptorParams } from "../../descriptors";
import { Model } from "../class/model";




export function Default( value: string|number|boolean|(() => any) ) {

    const params: FieldDescriptorParams = { default: value }

    function Default(target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function>) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Label decorator on a method")
        
        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Default
}