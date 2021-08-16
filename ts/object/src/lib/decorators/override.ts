import { meta } from '../meta'

export function override(target:any, name: string,  descriptor?: TypedPropertyDescriptor<Function>) {
    if ( descriptor ) {
		// get the value of the method
		const value = descriptor.value

		// set the method value to null on the object so that it is 
		// not set as the default implementation
		Object.defineProperty(target, name, {
			value: undefined,
			writable: true,
			enumerable: false
		});

		meta(target).method(name).override( value )
    }
    else {
        meta(target).property(name).override( true )
    }
    
}
