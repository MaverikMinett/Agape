
import { ActionDescriptor } from './action.descriptor';
import { InjectableDescriptor } from './injectable.descriptor';
import { ControllerDescriptor } from './controller.descriptor';
import { AspectDescriptor } from './aspect.descriptor';
import { OperationDescriptor } from '.';

import { include } from '@agape/object';


/**
 * Provide a stub descriptor that property decorators can attach to during
 * class construction time; before the actual service or Controller descriptors
 * are available.
 */
export interface StubDescriptor extends InjectableDescriptor, ControllerDescriptor{ }
@include(InjectableDescriptor, ControllerDescriptor)
export class StubDescriptor {

    actions: Map<string, ActionDescriptor> = new Map()

    operations: Map<string, OperationDescriptor> = new Map()

    constructor( public target: any ) {

    }

    static descriptor( target:any, create:boolean=false ) {
        if ( typeof target === "function" ) target = target.prototype

        let descriptor: StubDescriptor = Reflect.getMetadata( "stub:descriptor", target )

        if ( ! descriptor && create===true ) {
            descriptor = new StubDescriptor( target )
            Reflect.defineMetadata("stub:descriptor", descriptor, target)
        }

        return descriptor
    }

    finalize( component: AspectDescriptor ) {

        Reflect.deleteMetadata("stub:descriptor", this.target)
    }

    finalizeInjectable( injectable: InjectableDescriptor ) {
        if ( this.operations ) {
            for ( const [name, operation] of this.operations.entries() ) {
                injectable.operations.set(name, operation)
            }
        }
        if ( this.actions ) {
            for ( const [name, action] of this.actions.entries() ) {
                const descriptor = new OperationDescriptor(name)
                descriptor.exceptions(...action.exceptions())
                this.operations.set(name, descriptor)
            }
        }
        if ( this.operations ) {
            for ( const [name, action] of this.actions.entries() ) {
                injectable.operations.set(name, action)
            }
        }
        console.log("Injectable", injectable)
    }

    finalizeController( controller: ControllerDescriptor ) {
        if ( this.actions ) {
            for ( const [name, action] of this.actions.entries() ) {
                controller.actions.set(name, action)
            }
        }
    }


}
