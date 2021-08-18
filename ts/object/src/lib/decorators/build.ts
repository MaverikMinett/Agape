import { meta } from '../meta'
import { Class } from '../types'

export function build( value:string|Object|((any) => any) ):any
export function build( value:string|Object|((any) => any)|Class, propertyName?: string,  descriptor?: TypedPropertyDescriptor<Function> ):any
export function build( ...args:any[] ):any {

    let [ value, propertyName, descriptor ] = args

    function build( target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the build decorator on a method") 
        meta(target).property(name).build( value )
    }

    if ( propertyName === undefined ) {
        return build
    }
    else {
        let target = value
        value = undefined
        return build( target, propertyName, descriptor )
    }
}
