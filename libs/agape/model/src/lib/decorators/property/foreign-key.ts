import { Class } from "@agape/types";
import { FieldDescriptorParams } from "../../descriptors";
import { Field } from "./field"
import { Document } from "@agape/model"

/**
 * Use the @ForeignKey decorator to annotate a property and designate it
 * as the primary key of the model or view to which it belongs
 * @deprecated since version 0.7 use Foreign instead
 */
export function ForeignKey( foreignDocument?: Class<Document>, params?:FieldDescriptorParams ):any
export function ForeignKey( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function ForeignKey( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @ForeignKey decorator, this allows the decorator to
    // be used as either @ForeignKey or @ForeignKey(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams
    let foreignDocument: Class<Document>
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 3 
        ? [target, name, propertyDescriptor] = args
        : [foreignDocument, params] = args
    params ??= { }    
    params['foreignKey'] = true
    params['foreignDocument'] = foreignDocument    

    function ForeignKey( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the ForeignKey decorator on a method")

        Field(params)(target, name, propertyDescriptor)
    }

    if ( target ) return ForeignKey(target, name, propertyDescriptor)
    else return ForeignKey
}