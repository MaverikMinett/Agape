import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Res( ): ( target:any, name: string, parameterIndex: number ) => void
export function Res( target:any, name: string, parameterIndex: number ): void
export function Res( ...params: any[] ) {

    function Res( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'response', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        Res( target, name, parameterIndex )
    }
    else {
        return Res
    }

}

