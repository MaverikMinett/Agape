import { FieldDescriptorParams } from "../../descriptors";
import { Model } from "../class/model";




export function Widget( widget: string ) {

    const params: FieldDescriptorParams = { widget }

    function Widget(target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function>) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Label decorator on a method")
        
        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Widget
}