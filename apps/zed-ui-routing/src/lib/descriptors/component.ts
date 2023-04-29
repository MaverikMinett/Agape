import { Class } from "@agape/types";



export class ComponentDescriptor {
    selector: string;
    template: string;
    injected: Array<Class>

    constructor( params?: Partial<Pick<ComponentDescriptor, keyof ComponentDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }
}