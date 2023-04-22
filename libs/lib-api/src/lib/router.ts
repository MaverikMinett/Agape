import { Request, Response, Router as ExpressRouter } from 'express';
import { Controller } from './decorators';


class Route<T> {

    constructor(
        public controller: T,
        public method: string,
        public path: string,
        public action: string ) { }

    async dispatcher( request: Request, response: Response ) {
        response.send(await (this.controller as any)[this.action]( request, response ))
    }

    apply( expressRouter: ExpressRouter ) {
        (expressRouter as any)[this.method](this.path, async ( request: Request, response: Response ) => {
            return this.dispatcher( request, response )
        } )
    }
}

export class Router<T> {

    routes: Array<Route<T>> = []

    constructor( public controller: T, public path?: string ) {
        const controllerDescriptor = Controller.descriptor(controller)
        for ( let [name, actionDescriptor] of controllerDescriptor.actions.entries() ) {
            const { method, path } = actionDescriptor.route();
            this.addRoute( method, path, name as keyof T )
        }
    }

    addRoute( method: string, path: string, action: keyof T ) {
        const fullPath = this.path ? [this.path, path].join("/") : path
        const route = new Route( this.controller, method, fullPath, action as string )
        this.routes.push( route )
    }

}
