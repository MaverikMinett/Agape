export abstract class AspectDescriptor {

    name?: string;

    description?: string;

    symbol: string;

    constructor( public target: any ) {

    }

}
