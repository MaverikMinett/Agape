import { meta } from "../meta"
import { Serializer } from "../serializer"
import { Class } from "@agape/types"

import 'reflect-metadata'
export function coerce( to:Class ):any
export function coerce( to:[Class] ):any
export function coerce( to:Serializer ):any
export function coerce( to:[Serializer] ):any
export function coerce( target:any, name: string ):any
export function coerce( to?:any, ...args:any[] ):any {

    

    function coerce( target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the coerce decorator on a method") 
        
        /* if the to type wasn't specified try getting it from the reflect meta
           data */
        if ( to === undefined ) {
            const valueType = Reflect.getMetadata("design:type", target, name);
            
            if ( valueType === Array ) {
                throw new Error(`Sorry, in order to use @coerce on an array
                property you must explicitly pass in the element type as
                a parameter. See https://github.com/microsoft/TypeScript/issues/7169
                and... leave a comment?
                
                @coerce([MyClass]) ${name}`)
            }
            
            to = valueType
        }
        
        meta(target).property(name).coerce( to )
    }

    if ( args.length > 1 ) {
        let [target, name, descriptor ] = [to, ...args]
        
        to = undefined

        return coerce(target, name, descriptor)
    }

    else {
        return coerce
    }

}
