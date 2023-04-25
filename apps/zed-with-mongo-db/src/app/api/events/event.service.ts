import { Service } from "@agape/api";
import { db } from '../../../db'
import { IEvent } from "../../interfaces/IEvents";

@Service()
export class EventService {


    async list() {
        const events = await db()
        .collection('events')
        .find(
            {},
            { 
                projection: {
                    _id: 0,
                    id: {$toString: "$_id" },
                    name: 1,
                }
            }
        )
        .toArray()

        return events
    }

    async create( event: Omit<IEvent, 'id'> ) {
        const result = await db().collection('events').insertOne( event )
        return { id: result.insertedId.toString() }
    }

}