import { Class } from '@agape/types';
import { AspectDescriptor } from './aspect.descriptor';
import { Middleware } from '../interfaces/middleware.interface';



export class ModuleDescriptor extends AspectDescriptor {

    controllers: Class[] = []

    modules: Class[] = []

    provides: Class[] = []

    path?: string

    middleware: Array<Class<Middleware>> = []

    getControllers() {
        const controllers = this.controllers ? [...this.controllers] : []

        if ( this.modules ) {
            for ( let module of this.modules ) {

                const descriptor: ModuleDescriptor = Reflect.getMetadata( "api:module:descriptor", module.prototype ) 
                controllers.push( ...descriptor.getControllers() )
            }
        }

        return controllers
    }

}
