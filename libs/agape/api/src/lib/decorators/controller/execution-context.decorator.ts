import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function ExecutionContext( ): ( target:any, name: string, parameterIndex: number ) => void
export function ExecutionContext( target:any, name: string, parameterIndex: number ): void
export function ExecutionContext( ...params: any[] ) {

    function ExecutionContext( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'execution-context', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        ExecutionContext( target, name, parameterIndex )
    }
    else {
        return ExecutionContext
    }

}

