
import { ObjectId } from "mongodb";

export type MongoDocument<T extends {id: string}> = Omit<T, 'id'> & { _id: ObjectId }


export type OptionalId<T extends {id: K},K> = Omit<T, 'id'> & { id?: K }