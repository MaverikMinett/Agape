import { StubDescriptor } from '../../descriptors/stub';

export function Patch( path: string, params?: any ) {

    return function Patch( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('patch', path, params).status(200)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        let methodParameters = { 'params': 'any', 'body': 'any', 'query': 'any', 'headers': 'any' }
        stub.action(name).inject(methodParameters)

        return target
    }

}

