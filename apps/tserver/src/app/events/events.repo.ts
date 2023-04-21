
import db from '../../db'
import { ObjectId } from 'mongodb'
import { IEvent } from './event.interface'

export async function listEvents() {
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

export async function createEvent( event: Omit<IEvent, 'id'> ) {
    const result = await db().collection('events').insertOne( event )
    return { id: result.insertedId.toString() }
}

export async function retrieveEvent( id: string ) {
    const _id = new ObjectId(id)

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

    return event
}