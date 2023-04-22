import { StubDescriptor } from '../../descriptors/stub';


export function Get( path?: string, params?: any ) {

    return function Get( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).route('get', path, params).status(200)

        return target
    }

}

