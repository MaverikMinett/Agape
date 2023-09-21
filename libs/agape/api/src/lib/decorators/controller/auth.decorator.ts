import { Class } from '@agape/types'
import { StubDescriptor } from '../../descriptors/stub';


export function Auth( ): ( target:any, name: string, parameterIndex: number ) => void
export function Auth( target:any, name: string, parameterIndex: number ): void
export function Auth( ...params: any[] ) {

    function Auth( target:any, name: string, parameterIndex: number ) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, name)
        const stub: StubDescriptor = StubDescriptor.descriptor(target, true)

        stub.action(name).inject(parameterIndex, 'auth', paramTypes[parameterIndex] )
    }

    if ( params.length === 3 ) {
        const [ target, name, parameterIndex ] = params
        Auth( target, name, parameterIndex )
    }
    else {
        return Auth
    }

}

