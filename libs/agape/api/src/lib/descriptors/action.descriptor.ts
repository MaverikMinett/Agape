import { ActionDescription, HttMethod, ResponseDescription } from '../types';
import { Class, Dictionary } from '@agape/types';
import { ResponseDescriptor } from './response';
import { BodyDescriptor, BodyDescriptorParams } from './body';
import { ControllerDescriptor } from './controller.descriptor';
import { inherit } from '@agape/object';
import { Middleware } from '../interfaces/middleware.interface';
import { ActionParameterName } from '../interfaces/action-parameter-definition';


export class ActionDescriptor {

    // ʘbody: BodyDescriptor;

    ʘstatus: number;

    ʘroute: { method: string, path: string };

    ʘdescription: ActionDescription

    ʘresponses: ResponseDescriptor[]

    ʘinject: Array<any> = []

    ʘmiddlewares: Array<Class<Middleware>> = []

    ʘstaticFiles: string[]

    constructor( public name: string ) {

    }

    description(): string
    description( description: ActionDescription ): this
    description( description?: ActionDescription ) {
        if ( description === undefined ) return this.ʘdescription
        this.ʘdescription = description
        return this
    }

    getDescription( controller: ControllerDescriptor ): string {
        if ( ! this.ʘdescription ) return ""
        if ( typeof this.ʘdescription === "function" ) {
            return this.ʘdescription.call(this, controller, this )
        }
        return this.ʘdescription
    }

    inject( parameterIndex: number, parameter: ActionParameterName, designType: Class  ) {
        this.ʘinject[parameterIndex] = { parameter, designType }
    }


    respond(model: Class, description?: ResponseDescription, statusCode?: number ) {
        if ( this.ʘresponses === undefined ) this.ʘresponses = []
        const descriptor = new ResponseDescriptor( model, description, statusCode )
        this.ʘresponses.push(descriptor)
        return this
    }

    status(): number
    status( statusCode: number ): this
    status( statusCode?: number ) {
        if ( statusCode === undefined ) return this.ʘstatus
        this.ʘstatus = statusCode;
        return this
    }

    route(): { method: string, path: string }
    route( method:HttMethod, path?: string, params?: any ): this
    route( method?:HttMethod, path?: string, params?: any ):any {
        if ( method === undefined ) return this.ʘroute
        this.ʘroute = { method, path }
        return this
    }

    // body(): BodyDescriptor
    // body( model: Class, description?: string, contentType?: string ): this
    // body( params: BodyDescriptorParams )
    // body( params?: Class|BodyDescriptorParams, description?: string, contentType?: string ) {
    //     if ( params === undefined ) return this.ʘbody

    //     let descriptor: BodyDescriptor

    //     if ( typeof params === 'function' ) {
    //         const model = params
    //         descriptor = new BodyDescriptor({ model })

    //         descriptor.model = model
    //         if ( description !== undefined ) descriptor.description = description
    //     }
    //     else {
    //         descriptor = new BodyDescriptor(params)
    //     }

    //     this.ʘbody = descriptor
    //     return this
    // }

    middlewares( ...middlewares: Array<Class<Middleware>>) {
        this.ʘmiddlewares.push(...middlewares)
    }

    staticFiles( ): string[]
    staticFiles( ...paths: string[] ): this
    staticFiles( ...paths: string[] ) {

        if ( paths.length === 0 ) {
            return this.ʘstaticFiles
        }

        if ( ! this.route() ) {
            this.route('get', undefined)
        }
        if ( ! this.status() ) {
            this.status(200)
        }

        this.ʘstaticFiles ??= []
        this.ʘstaticFiles.push(...paths)
        return this
    }


}






