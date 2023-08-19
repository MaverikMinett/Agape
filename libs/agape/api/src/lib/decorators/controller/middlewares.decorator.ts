import { Class } from '@agape/types';
import { StubDescriptor } from '../../descriptors/stub';
import { Middleware } from '../../interfaces/middleware.interface';


export function Middlwares( ...middlewares: Array<Class<Middleware>> ) {

    return function Middlwares( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).middlewares(...middlewares)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        let methodParameters = { 'params': 'any', 'body': 'any', 'query': 'any', 'headers': 'any' }
        stub.action(name).inject(methodParameters)

        return target
    }

}