import { Service } from "@agape/api";
import { db } from '../../../db'
import { IEvent } from "../../interfaces/IEvents";
import { ObjectId } from "mongodb";

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

    async retrieve( id: string ) {
        let _id: ObjectId
        try {
            _id = new ObjectId(id)
        }
        catch {
            throw new Error("Record not found")
        }
        
    
        const event = await db()
            .collection('events')
            .findOne(
                { _id },
                { 
                    projection: {
                        _id: 0,
                        id: {$toString: "$_id" },
                        name: 1,
                    }
                }
            )
        if ( ! event ) {
            throw new Error(`Could not find event with id ${id}, record not found`)
        }
        return event
    }

    async update( id: string, event: IEvent ) {
        let _id: ObjectId
        try {
            _id = new ObjectId(id)
        }
        catch {
            throw new Error("Record not found")
        }
        // const _event = documentFrom(event)
    
        const result = await db()
            .collection('events')
            .updateOne(
                { _id },
                {
                    $set: event
                }
            )
    
        if ( result.matchedCount === 0 ) {
            throw new Error(`Could not update event with id $id, record not found`)
        }
        if ( result.acknowledged === false ) {
            // throw new unkown error
        }
    }

    async delete( id: string ) {
        let _id: ObjectId
        try {
            _id = new ObjectId(id)
        }
        catch {
            throw new Error("Record not found")
        }
    
        const result = await db()
            .collection('events')
            .deleteOne({ _id })
    
        if ( result.deletedCount === 0 ) {
            throw new Error(`Could not delete event with id $id, record not found`)
        }    
        if ( result.acknowledged === false ) {
            // throw new unkown error
        }
    }

}