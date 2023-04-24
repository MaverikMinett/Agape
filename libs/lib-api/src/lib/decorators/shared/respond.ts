import { Class } from '@agape/types'
import { ResponseDescription } from '../../types';
import { StubDescriptor } from '../../descriptors/stub';

export function Respond(model: Class, description?: ResponseDescription, statusCode?: number ) {

    return function Respond( target:any, name: string, typedPropertyDescriptor: TypedPropertyDescriptor<Function> ) {

        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).respond(model, description, statusCode)

        return target
    }

}

