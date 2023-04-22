import { StubDescriptor } from '../../descriptors/stub';

export function Status ( statusCode: number ) {

    return function Status( target: any, name: string, propertyDescriptor: TypedPropertyDescriptor<Function>) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).status(statusCode)

        return target
    }

}
