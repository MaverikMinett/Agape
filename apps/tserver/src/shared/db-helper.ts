


import {ObjectId} from 'mongodb'

export function stringifyId<T extends {_id: ObjectId}>(record: T) {
    const  id = record._id.toString();
    (record as any).id = id; 
    delete record._id;
}