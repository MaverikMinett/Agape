import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Query( ): ( target:any, name: string, parameterIndex: number ) => void
export function Query( target:any, name: string, parameterIndex: number ): void
export function Query( ...params: any[] ) {

    function Query( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'request', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        Query( target, name, parameterIndex )
    }
    else {
        return Query
    }

}

