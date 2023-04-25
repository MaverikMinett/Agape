import { Service } from "@agape/api";
import { db } from '../../../db'

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


}