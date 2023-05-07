import { meta } from '../meta'

// export function readonly ( value:any ) {
    export function readonly(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use readonly decorator on a method") 
        meta(target).property( propertyName ).readonly(true)
    }
// }

