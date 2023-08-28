import { StubDescriptor } from "../../descriptors"


export function StaticFiles( ...paths: string[] ) {

    return function StaticFiles( target:any, name: string, descriptor: TypedPropertyDescriptor<Function> ) {

        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        const action = stub.action(name)
        
        action.staticFiles(...paths)

        /* fake dependency injection */
        /* let methodParameters = Reflect.getMetadata('controller:action:params', descriptor) */
        // let methodParameters = { 'params': 'any', 'body': 'any', 'query': 'any', 'headers': 'any' }
        // stub.action(name).inject(methodParameters)

        return target
    }

}
