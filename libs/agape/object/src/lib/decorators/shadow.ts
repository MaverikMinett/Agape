import { meta } from '../meta'

export function shadow( value:any, propertyName?: string,  descriptor?: TypedPropertyDescriptor<Function> ):any {

    function shadow(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the shadow decorator on a method")
        meta(target).property( propertyName ).shadow(value)
    }

    if ( propertyName === undefined ) {
        return shadow
    }
    else {
        let target = value
        value = undefined
        return shadow( target, propertyName, descriptor )
    }

}
