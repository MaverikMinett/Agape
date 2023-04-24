import { Class } from '@agape/types';

/**
 * Describe the body of an incoming HTTP request
 */
export class BodyDescriptor {

    description?: string                       // Documentation

    contentType?: string = "application/json"  // Data format

    model?: Class                              // Validate the data

    constructor( params?: BodyDescriptorParams ) {
        params && Object.assign(this, params)
    }

}

export type BodyDescriptorParams = Pick<BodyDescriptor, keyof BodyDescriptor>
