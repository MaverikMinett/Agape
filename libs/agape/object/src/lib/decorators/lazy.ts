import { meta } from '../meta'

/* This does the same thing as the 'property' decorator. */


export function lazy( value:any, propertyName?: string,  descriptor?: TypedPropertyDescriptor<Function> ):any {

    function lazy(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the lazy decorator on a method")
        meta(target).property( propertyName ).lazy(value)
    }

    if ( propertyName === undefined ) {
        return lazy
    }
    else {
        let target = value
        value = undefined
        return lazy( target, propertyName, descriptor )
    }

}
