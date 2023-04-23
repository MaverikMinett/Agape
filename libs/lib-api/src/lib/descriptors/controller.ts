import { Class } from '@lib/types';
import { ActionDescriptor } from './action';
import { AspectDescriptor } from './aspect.descriptor';


export class ControllerDescriptor extends AspectDescriptor {

    path?: string

    actions: Map<string, ActionDescriptor> = new Map()

    services: Class[] = []

    action( name: string ) {
        let action = this.actions.get(name)
        if ( ! action ) {
            action = new ActionDescriptor( name )
            this.actions.set(name, action)
        }
        return action
    }

}


