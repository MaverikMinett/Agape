import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../../descriptors";
import { Model } from "../class/model";

/**
 * Create a required field
 */
export function Required( optional: boolean ):any
export function Required( params?:FieldDescriptorParams ):any
export function Required( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Required( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Required decorator, this allows the decorator to
    // be used as either @Required or @Required(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:Partial<FieldDescriptorParams> = { required: true }
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 && (args[0] === true || args [0] === false)
        ? params.required = args[0]
        : args.length === 1
        ? Object.assign(params,args[0])
        : [target, name, propertyDescriptor] = args

    function Required( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Required decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    if ( target ) return Required(target, name, propertyDescriptor)
    else return Required
}