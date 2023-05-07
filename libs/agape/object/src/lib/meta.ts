import { ObjectDescriptor } from './descriptors'

/**
 * Get the ObjectDescriptor for an object or class, creates a new
 * ObjectDescriptor if one does not already exist.
 * 
 * @param target Object or class to get descriptor for
 */
export function meta( target:any ):ObjectDescriptor {
    if ( typeof target === "function" ) target = target.prototype
    if ( ! target.hasOwnProperty('Δmeta') ) {
        Object.defineProperty(target, 'Δmeta', {
            value: new ObjectDescriptor(target),
            writable: false,
            enumerable: false
        })
    }
    return target['Δmeta'];
}

