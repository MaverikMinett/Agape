import { Class } from '@agape/object';
import { ModelDescriptor, ModelDescriptorParams } from '../descriptors'

import 'reflect-metadata'


/**
 * Use the @Model decorator to annotate a class and designate it as a
 * data model
 */
export function Model( params?:Omit<ModelDescriptorParams,'symbol'|'fields'> ):any
export function Model( target:Class ):any
export function Model( ...args:any[] ):any {

    // determine the target class and the descriptor parameters from the
    // arguments supplied to the @Model descriptor, this allows the
    // descriptor to be called as either @Model or @Model(params)
    let target:{ new(...args: any[] ): any; }
    let params:ModelDescriptorParams
    if ( args.length ) {
        args[0] instanceof Function 
            ? [target] = args
            : [params] = args
    }

    function Model( target:any ) {
        params ??= { }
        params.name ??= target.name
        params.symbol ??= target.name

        // A stub model descriptor may have been created by a @Field decorator
        // this happens because the @Field decorators are executed before the
        // @Model decorator is called. If a descriptor exist, retrieve it from
        // the reflect metadata and apply any parameters passed to the @Model decorator
        let descriptor = Reflect.getMetadata( "model:descriptor", target.prototype );
        if ( descriptor ) {
            // Copy in params
            Object.assign(descriptor,params)
            // Autopopulate empty label/token values
            descriptor.autopopulate()
        }
        // If a model descriptor does not already exist, create one using the
        // parameters applied to the @Model decorator
        else  {
            descriptor = new ModelDescriptor( params )
        }
        Reflect.defineMetadata( "model:descriptor", descriptor, target );
    }

    if ( target ) return Model(target)
    else return Model

}


Model.descriptor = function ( model:Class ) {
    return Reflect.getMetadata( "model:descriptor", model ) as ModelDescriptor
}
