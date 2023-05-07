import { meta } from '../meta'

/* 
Does the same thing as lazy. This is due to the way in which properties are 
implemented in javascript and how agape's property dispatcher works...

Really this should accept a default value. That would mean setting the 'value'
on the native property descriptor when it is created instead of the getter and the setter.
Or maybe just set the value directly on the prototype?

*/

export function property ( value:any ) {
    return function property(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use property decorator on a method") 
        meta(target).property( propertyName ).default(value)
    }
}

