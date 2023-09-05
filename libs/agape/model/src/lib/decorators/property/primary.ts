import { FieldDescriptorParams } from "../../descriptors";
import { Field } from "./field"

/**
 * Use the @Primary decorator to annotate a property and designate it
 * as the primary key of the model or view to which it belongs
 */
export function Primary( params?:FieldDescriptorParams ):any
export function Primary( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Primary( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Primary decorator, this allows the decorator to
    // be used as either @Primary or @Primary(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 
        ? [params] = args
        : [target, name, propertyDescriptor] = args
    params ??= {}    
    params['primary'] = true   

    function Primary( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Primary decorator on a method")

        Field(params)(target, name, propertyDescriptor)

        // let model = Model.descriptor(target, true)

        // model.field(name).assign(params)
    }

    if ( target ) return Primary(target, name, propertyDescriptor)
    else return Primary
}