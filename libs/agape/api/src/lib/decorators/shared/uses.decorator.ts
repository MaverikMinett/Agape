import { StubDescriptor } from '../../descriptors/stub';
import { Class } from '@agape/types'


export function Uses( ...operations: Array<[Class,string]> ) {

    return function Uses( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).uses(...operations)

        return target
    }

}

