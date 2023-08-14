import { Class } from './types'

export function classExtends( model: Class, ancestor: Class ) {

    if ( model === ancestor ) {
        return true
    }
    
    const prototype = model.prototype

    if ( prototype instanceof ancestor ) {
        return true
    }
    
    return false

}