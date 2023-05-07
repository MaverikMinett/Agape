import { meta } from '../meta'

export function ephemeral( value:any, propertyName?: string,  descriptor?: TypedPropertyDescriptor<Function> ):any {

    function ephemeral(target:any, propertyName: string,  descriptor?: TypedPropertyDescriptor<Function>) {
        if ( descriptor ) throw new Error("Cannot use the ephemeral decorator on a method")
        meta(target).property( propertyName ).ephemeral(value)
    }

    if ( propertyName === undefined ) {
        return ephemeral
    }
    else {
        let target = value
        value = undefined
        return ephemeral( target, propertyName, descriptor )
    }

}
