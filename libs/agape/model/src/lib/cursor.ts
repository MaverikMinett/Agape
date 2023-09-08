import { Class } from "@agape/types";
import { ModelDescriptor } from "./descriptors";

export function handle( target:Class ) {
    let descriptor = Reflect.getMetadata( "model:descriptor", target );
    if ( ! descriptor ) {
        descriptor = new ModelDescriptor( target.name )
        Reflect.defineMetadata( "model:descriptor", descriptor, target );
    }
    return descriptor
}

export function $model( target: Class ) {
    return Reflect.getMetadata( "model:descriptor", target );
}