import { Class } from '@agape/types';
import { ActionDescriptor } from './action.descriptor';
import { AspectDescriptor } from './aspect.descriptor';
import { Middleware } from '../interfaces/middleware.interface';


export class ControllerDescriptor extends AspectDescriptor {

    path?: string

    actions: Map<string, ActionDescriptor> = new Map()

    middlewares: Array<Class<Middleware>> = []

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


