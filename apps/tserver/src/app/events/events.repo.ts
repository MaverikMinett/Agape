
import db from '../../db'
import { ObjectId } from 'mongodb'
import { stringifyId } from '../../shared/db-helper'



export async function listEvents() {
    const events = await db().collection('events').find().toArray()
    events.map( stringifyId )
    return events
}

export async function retrieveEvent( id: string ) {
    const _id = new ObjectId(id)
    const event = await db().collection('events').findOne({ _id })
    stringifyId(event)
    return event
}