import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../../descriptors";
import { DesignType } from "../../types";
import { Model } from "../class/model";

/**
 * Use the @Field decorator to annotate a property and designate it
 * as a field of the model or view to which it belongs
 */
export function Field( designType: DesignType ): any
export function Field( params?:FieldDescriptorParams ):any
export function Field( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Field( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Field decorator, this allows the decorator to
    // be used as either @Field or @Field(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams = { }
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 && (args[0] instanceof Function || Array.isArray(args[0])) 
        ? params.designType = args[0]
        : args.length == 1
        ? [params] = args
        : [target, name, propertyDescriptor] = args

    function Field( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Primary decorator on a method")

        const model = Model.descriptor(target, true)

        const field = model.field(name)

        field.assign(params)

        const valueType = Reflect.getMetadata("design:type", target, name);

        if ( ! field.designType ) field.designType = valueType
    }

    if ( target ) return Field(target, name, propertyDescriptor)
    else return Field
}