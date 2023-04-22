import { Class } from '@lib/types';
import { ResponseDescription } from '../types';

export class ResponseDescriptor {
    constructor(public model: Class, public description?: ResponseDescription, statusCode?: number ) {

    }
}
