import { Class } from '@lib/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Body( model: Class, description?: string ) {

    return function Body( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).body(model, description)

        return target
    }

}

