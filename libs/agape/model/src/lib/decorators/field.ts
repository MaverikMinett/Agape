import { FieldDescriptor, FieldDescriptorParams, ModelDescriptor } from "../descriptors";

/**
 * Use the @Field decorator to annotate a property and designate it
 * as a field of the model or view to which it belongs
 */
export function Field( params?:FieldDescriptorParams ):any
export function Field( target:any, name:string, propertyDescriptor?:TypedPropertyDescriptor<Function> ):any
export function Field( ...args:any[] ):any {

    // Determine the target and parameters to be passed to the FieldDescriptor based
    // on arguments supplied to the @Field decorator, this allows the decorator to
    // be used as either @Field or @Field(params)
    let target:{ new(...args: any[] ): any; }
    let name:string
    let params:FieldDescriptorParams = {}
    let propertyDescriptor:TypedPropertyDescriptor<Function>
    args.length === 1 
        ? [params] = args
        : [target, name, propertyDescriptor] = args

    function Field( target:any, name:string, propertyDescriptor:TypedPropertyDescriptor<Function> ) {
        if ( propertyDescriptor ) throw new Error("Cannot use the Field decorator on a method")

        // if a name was not given in the parameters, use the property name
        params.name ??= name

        // create a new FieldDescriptor
        const field = new FieldDescriptor( params )

        // get the ModelDescriptor
        let model = Reflect.getMetadata( "model:descriptor", target );

        // create a ModelDescriptor if one does not exist, this happens because
        // @Field decorators are called on the class and property before @Model
        // is called on the class
        if ( ! model ) {
            model = new ModelDescriptor( target )
            Reflect.defineMetadata( "model:descriptor", model, target );
        }

        // add the field to the ModelDescriptor
        model.add(field)
    }

    if ( target ) return Field(target, name, propertyDescriptor)
    else return Field
}