import { meta } from '../meta'

export function inherit( from:Function|Object, property?:string ) {
    return function inherit(target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the inherit decorator on a method") 
        meta(target).property( name ).inherit(from, property)
    }
}

