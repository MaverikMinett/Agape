import { Class } from '@agape/types';
import { Collection } from 'mongodb';

export abstract class Database {

    abstract collection( model: Class ): Collection

}