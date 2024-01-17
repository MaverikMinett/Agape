import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../../descriptors";
import { Model } from "../class/model";

/**
 * Create a required field
 */
export function Optional( optional: boolean ):any
export function Optional( params?:FieldDescriptorParams ):any
export function Optional( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Optional( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Required decorator, this allows the decorator to
    // be used as either @Required or @Required(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:Partial<FieldDescriptorParams> = { optional: true }
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 && (args[0] === true || args [0] === false)
        ? params.optional = args[0]
        : args.length === 1
        ? Object.assign(params,args[0])
        : [target, name, propertyDescriptor] = args

    function Optional( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Required decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    if ( target ) return Optional(target, name, propertyDescriptor)
    else return Optional
}