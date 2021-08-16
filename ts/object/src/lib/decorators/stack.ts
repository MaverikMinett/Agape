import { meta } from '../meta'

export function stack(target:any, name: string,  descriptor: TypedPropertyDescriptor<Function>) {
    
	// get the value of the method
	const value = descriptor.value

	// set the method value to null on the object so that it is 
	// not set as the default implementation
	Object.defineProperty(target, name, {
		value: null,
		writable: true,
		enumerable: false
	});

	// stack it up
	meta(target).method(name).stack( value )
}