import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../../descriptors";
import { TextFieldParams } from "../../types";
import { Model } from "../class/model";

/**
 * Create a text field
 */
export function Text( optional: boolean ):any
export function Text( params?:TextFieldParams ):any
export function Text( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Text( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Text decorator, this allows the decorator to
    // be used as either @Text or @Text(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:Partial<FieldDescriptorParams> = { type: 'text', autosize: true }
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 
        ? params = { ...params, ...args[0]}
        : [target, name, propertyDescriptor] = args

    function Text( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Text decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    if ( target ) return Text(target, name, propertyDescriptor)
    else return Text
}