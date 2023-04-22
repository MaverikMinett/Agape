import { Class } from '@lib/types';
import { Module } from './decorators/class/module.decorator'





export class Api {

    controllers: Class[] = []

    modules: Class[] = []

    constructor( modules?: Class[] ) {
        if ( modules ) modules.forEach( module => this.registerModule(module) )
    }

    registerModule( module: Class ) {

        this.modules.push( module )

        const descriptor = Module.descriptor( module )

        const controllers = descriptor.getControllers()

        this.controllers.push( ...controllers )
    }

    call( controller: Class, action: string ) {
        const instance = this.getController( controller )
        return instance.action.call(instance)
    }

    getController<T extends Class>( controller: T ): InstanceType<T> {
        return this.instantiateController( controller )
    }

    protected instantiateController<T extends Class>( controller: T ): InstanceType<T> {
        const instance = new controller()
        return instance
    }

}

export abstract class AbstractApi {

}

/**
 * The Ahead-of-time controller uses a single instance of the controller.
 * The controller is instantiated the first time it is used and then reused
 * each time an action is called on the controller.
 */
export class AotApi extends Api {

    controllerCache = new Map<Class,InstanceType<Class>>()

    getController<T extends Class>(controller: T): InstanceType<T> {
        if ( this.controllerCache.has(controller) )
            return this.controllerCache.get(controller)

        const instance = super.getController(controller);
        this.controllerCache.set(controller, instance)
        return instance
    }

    // TODO: Should throw errors if the user attempts to use a disposable service inside the constructor of a controller
    // protected instantiateController<T extends Class>( controller: T ): InstanceType<T> {
    //     const instance = new controller()
    //     return instance
    // }
}


// export class JitApi extends Api {

//     protected getController<T extends Class>(controller: T): InstanceType<T> {
//         if ( this.controllerCache.has(controller) )
//             return this.controllerCache.get(controller)

//         const instance = super.getController(controller);
//         this.controllerCache.set(controller, instance)
//         return instance
//     }

// }



// const app = express()
//





// protected

// registerModel<T extends Class>( model: T ) {
// const controller = new ModelController( model, orm )
// controller.path = Model.descriptor(model).tokens
// this.registerControllerInstance( controller )

// const descriptor = Controller.descriptor( controller )
// }

// TODO: Should the controller be instantiated during initialization
// and reused for each request? or should a new controller be instantiated
// and thrown away for each request? If a new controller is instantiated for
// each request then new backend service could be injected for each request,
// which means that Authentication tokens could be injected and made available to
// Backend services? What's the overhead?
// registerControllerInstance<T>(controller: T ) {
//     this.controllers.push( controller )   // TODO: Store this in a map
//
//     const router = new Router<T>( controller )
//
//     const expressRouter = ExpressRouter()
//
//     for ( let route of router.routes ) {
//         route.apply( expressRouter )
//     }
//
//     this.app.use('/api', expressRouter )
// }

// registerController<T extends Class>( controller: T ) {
    // const instance = this.instantiateController( controller )
    // this.registerControllerInstance(instance)
// }
