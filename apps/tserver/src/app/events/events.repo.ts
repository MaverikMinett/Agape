
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
        throw new Error(`Could not find event with id $${id}, record not found`)
    }
    return event
}

export async function updateEvent( id: string, event: IEvent ) {
    // if ( id !== event.id ) {
    //     throw new Error("Cannot change the ID of a record. Not permitted.")
    // }

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

export async function deleteEvent( id: string ) {

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