import { Class } from "@agape/types";
import { FieldDescriptorParams } from "../../descriptors";
import { Field } from "./field"
import { Document, Model } from "@agape/model"

/**
 * Use the @Foreign decorator to annotate a property and designate it
 * as the primary key of the model or view to which it belongs
 */
export function Foreign( document?: Class<Document> ):any
export function Foreign( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Foreign( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @ForeignKey decorator, this allows the decorator to
    // be used as either @ForeignKey or @ForeignKey(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams = { foreignKey: true }
    let document: Class<Document>
    let propertyDescriptor:TypedPropertyDescriptor<Function>

    args.length === 1
        ?  [document] = args
        :  [target, name, propertyDescriptor]

    if (args.length === 1) {
        params['foreignDocument'] = document  
    }    
     
    function Foreign( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the ForeignKey decorator on a method")

        const model = Model.descriptor(target, true)

        const field = model.field(name)

        field.assign(params)
    }

    if ( target ) return Foreign(target, name, propertyDescriptor)
    else return Foreign
}