import { Class } from '@agape/types';
import { Exception } from '@agape/exception';

export class ResponseDescriptor {
    constructor(public model: Class|Exception|[Class], public description?: string ) {

    }
}
