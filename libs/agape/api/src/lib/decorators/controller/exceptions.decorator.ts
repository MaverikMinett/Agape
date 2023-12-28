import { Exception } from '@agape/exception';
import { StubDescriptor } from '../../descriptors/stub';

export function Exceptions( ...exceptions: Exception[] ) {

    return function Exceptions( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).exceptions(...exceptions)

        return target
    }

}

