import { StubDescriptor } from '../../descriptors/stub';


export function Get( path?: string, params?: any ) {

    return function Get( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('get', path, params).status(200)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        let methodParameters = { 'payload': 'any', 'params': 'any' }
        stub.action(name).inject(methodParameters)

        return target
    }

}

