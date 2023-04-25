import { ActionDescription} from '../../types';
import { StubDescriptor } from '../../descriptors/stub';


export function Description( description: ActionDescription ) {
    return function Description( target: any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).description(description)

        return target
    }
}

