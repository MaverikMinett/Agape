import { FieldDescriptorParams } from "../../descriptors";
import { Model } from "../class/model";


export function Decimal( decimals: number ):any {

    let params: FieldDescriptorParams = { type: 'decimal', decimals }

    function Decimal( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Integer decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    return Decimal
}