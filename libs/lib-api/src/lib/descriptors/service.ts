import { OperationDescriptor } from './operation';
import { AspectDescriptor } from './aspect.descriptor';
import { Class } from '@lib/types';


/**
 * Describe a backend service
 */
export class ServiceDescriptor extends AspectDescriptor {

    operations: Map<string, OperationDescriptor> = new Map()

    services: Class[] = []

    operation( name: string ) {
        let operation = this.operations.get(name)
        if ( ! operation ) {
            console.log(`Creating action ${name}`)
            operation = new OperationDescriptor( name )
            this.operations.set(name, operation)
        }
        return operation
    }

}
