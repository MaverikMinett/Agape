import { StubDescriptor } from '../../descriptors/stub';

export function Delete( path?: string, params?: any ) {

    return function Delete( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('delete', path, params).status(204)

        return target
    }

}
