import { Class } from '../../../../object/src';
import { Collection } from 'mongodb';

export abstract class Database {

    abstract collection( model: Class ): Collection

}