import { Class } from '@agape/types';
import { StubDescriptor } from '../../descriptors/stub';
import { Middleware } from '../../interfaces/middleware.interface';


export function Middlwares( ...middlewares: Array<Class<Middleware>> ) {

    return function Middlwares( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).middlewares(...middlewares)

        return target
    }

}