import { Class } from '@lib/types';
import { AspectDescriptor } from './aspect.descriptor';
import { ControllerDescriptor } from './controller';


export class ModuleDescriptor extends AspectDescriptor {

    controllers: Class[]

    modules: Class[]

    // controllers: ControllerDescriptor[] = []

    // modules: ModuleDescriptor[] = []

    getControllers() {
        const controllers = [...this.controllers]

        if ( this.modules ) {
            for ( let module of this.modules ) {
                const descriptor: ModuleDescriptor = Reflect.getMetadata( "api:module:descriptor", module ) 
                controllers.push( ...descriptor.getControllers() )
            }
        }

        return controllers
    }

}
