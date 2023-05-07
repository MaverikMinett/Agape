import { meta } from '../meta'

export function delegate( to:Function|Object, property?:string ) {
    return function delegate(target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the delegate decorator on a method") 
        meta(target).property( name ).delegate(to, property)
    }
}

