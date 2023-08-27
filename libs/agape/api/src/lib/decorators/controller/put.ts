import { StubDescriptor } from '../../descriptors/stub';

export function Put( path: string, params?: any ) {

    return function Put( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('put', path, params).status(200)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        // let methodParameters = { 'params': 'any', 'body': 'any', 'query': 'any', 'headers': 'any' }
        // stub.action(name).inject(methodParameters)

        return target
    }

}

