import { StubDescriptor } from '../../descriptors/stub';

export function Post( path?: string, params?: any ) {

    return function Post( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('post', path, params).status(201)

        return target
    }

}

