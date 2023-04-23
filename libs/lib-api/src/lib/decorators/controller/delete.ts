import { StubDescriptor } from '../../descriptors/stub';

export function Delete( path?: string, params?: any ) {

    return function Delete( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('delete', path, params).status(204)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        let methodParameters = { 'payload': 'any', 'params': 'any' }
        stub.action(name).inject(methodParameters)

        return target
    }

}
