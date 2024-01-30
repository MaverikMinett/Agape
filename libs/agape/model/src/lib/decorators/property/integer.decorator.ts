import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../../descriptors";
import { Model } from "../class/model";

/**
 * Create a required field
 */
export function Integer( ):any
// export function Required( params?:FieldDescriptorParams ):any
export function Integer( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Integer( ...args:any[] ):any {

    let target:{ new(...args: any[] ): any; } 
    let name: string
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    if ( args.length === 3 ) {
        [target,name,propertyDescriptor] = args
    }

    let params: FieldDescriptorParams = { type: 'integer' }

    function Integer( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Integer decorator on a method")

        let model = Model.descriptor(target, true)

        model.field(name).assign(params)
    }

    if ( target ) return Integer(target, name, propertyDescriptor)
    else return Integer
}