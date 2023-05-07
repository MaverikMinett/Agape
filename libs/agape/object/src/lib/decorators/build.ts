import { meta } from '../meta'


export function build( method?:string|Object, ...args:any[] ):any {

    function build( target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the build decorator on a method") 
        if ( method === undefined ) method = `_build_${name}`
        meta(target).property(name).default( (o:any) => o[<string>method].call(o,o) )
    }

    if ( method instanceof Object ) {
        let [target, name, descriptor] = [method, ...args]

        method = undefined
        
        return build(target, name, <any>descriptor)
    }

    else {
        return build
    }

}
