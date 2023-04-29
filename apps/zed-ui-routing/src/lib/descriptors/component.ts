


export class ComponentDescriptor {
    selector: string;
    template: string;

    constructor( params?: Partial<Pick<ComponentDescriptor, keyof ComponentDescriptor>> ) {
        if ( params ) Object.assign(this, params)
    }
}