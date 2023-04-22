import { StubDescriptor } from '../../descriptors/stub';

export function Put( path: string, params?: any ) {

    return function Put( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('put', path, params).status(204)

        return target
    }

}

