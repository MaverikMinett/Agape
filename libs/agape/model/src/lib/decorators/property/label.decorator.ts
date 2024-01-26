import { FieldDescriptorParams } from "../../descriptors";
import { Model } from "../class/model";




export function Label( label: string ) {

    const params: FieldDescriptorParams = { label }

    function Label(target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function>) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Label decorator on a method")
        
        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Label
}