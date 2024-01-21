import { Class } from '@agape/types';
import { ModelDescriptor, ModelDescriptorParams } from '../../descriptors'

import 'reflect-metadata'
import { camelize } from '@agape/string';


/**
 * Use the @Model decorator to annotate a class and designate it as a
 * data model
 */
export function Model( token: string, params?:Omit<ModelDescriptorParams,'symbol'|'fields'> ):any
export function Model( params?:Omit<ModelDescriptorParams,'symbol'|'fields'> ):any
export function Model( target:Class ):any
export function Model( ...args:any[] ):any {

    // determine the target class and the descriptor parameters from the
    // arguments supplied to the @Model descriptor, this allows the
    // descriptor to be called as either @Model or @Model(params)
    let target:{ new(...args: any[] ): any; }
    let token: string
    let params:ModelDescriptorParams
    if ( args.length ) {

        if ( args[0] instanceof Function ) {
            [target] = args
        }
        else if ( typeof args[0] === 'string' ) {
            [token, params] = args
            params ??= { }
            params.token ??= token
        }
        else {
            [params] = args
        }

        args[0] instanceof Function 
            ? [target] = args
            : [params] = args
    }

    function Model( target:any ) {
        params ??= { }
        if ( params.token && params.name === undefined ) {
            params.name = camelize(params.token)
        }
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
            descriptor.target = target
            descriptor.autopopulate()
        }
        // If a model descriptor does not already exist, create one using the
        // parameters applied to the @Model decorator
        else  {
            descriptor = new ModelDescriptor( {...params, target} )
        }
        Reflect.defineMetadata( "model:descriptor", descriptor, target );

        // autopopulate field data
        for ( const field of descriptor.fields.all() ) {
            field.autopopulate()
        }
    }

    if ( target ) return Model(target)
    else return Model

}


Model.descriptor = function ( target:Class, create:boolean=false ) {

    let descriptor: ModelDescriptor = Reflect.getMetadata( "model:descriptor", target )

    if ( ! descriptor && create === true ) {
        descriptor = new ModelDescriptor({ target: target, name: target.name})
        Reflect.defineMetadata("model:descriptor", descriptor, target)
    }

    return descriptor
}
