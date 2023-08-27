import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Params( ): ( target:any, name: string, parameterIndex: number ) => void
export function Params( target:any, name: string, parameterIndex: number ): void
export function Params( ...params: any[] ) {

    function Params( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'params', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        Params( target, name, parameterIndex )
    }
    else {
        return Params
    }

}

