import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Body( ): ( target:any, name: string, parameterIndex: number ) => void
export function Body( target:any, name: string, parameterIndex: number ): void
export function Body( ...params: any[] ) {

    function Body( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'body', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        Body( target, name, parameterIndex )
    }
    else {
        return Body
    }

}

