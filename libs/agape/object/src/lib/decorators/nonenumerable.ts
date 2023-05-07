import { meta } from '../meta'

export function nonenumerable(target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
    if ( descriptor ) throw new Error("Cannot use property decorator on a method")
    meta(target).property( name ).enumerable(false)
}
