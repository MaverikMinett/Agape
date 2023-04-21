
import db from '../../db'
import { ObjectId } from 'mongodb'
import { IEvent } from './event.interface'
import { MongoDocument } from '../../types'
import { documentFrom } from '../../lib/mongo-helper'

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

export async function updateEvent( id: string, event: IEvent ) {
    if ( id !== event.id ) {
        throw new Error("Cannot change the ID of a record. Not permitted.")
    }

    const _id = new ObjectId(id)
    const _event = documentFrom(event)

    await db()
        .collection('events')
        .updateOne(
            { _id },
            {
                $set: _event
            }
        )
}