import { Class } from "@agape/types"



export class ServiceDescriptor {
    providedIn?: 'root'|Class

    injected: Array<Class>

    constructor( public serviceClass: Class, 
        params?: Partial<Pick<ServiceDescriptor, keyof ServiceDescriptor>> 
        ) {
        if ( params ) Object.assign(this, params)
    }
}