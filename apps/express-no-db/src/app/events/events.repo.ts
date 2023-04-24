
import db from '../../db'
import { ObjectId } from 'mongodb'
import { IEvent } from './event.interface'

import { events } from './events.model'
import { v4 } from 'uuid';
import { Exception } from '@agape/exception';

export async function listEvents() {
    return events
}

export async function createEvent( event: Omit<IEvent, 'id'> ) {
    const result = await db().collection('events').insertOne( event )
    return { id: result.insertedId.toString() }
}

export async function retrieveEvent( id: string ) {
    const event = events.find( e => e.id === id )
    if ( ! event ) throw new Exception(404, "Could not find event with that ID")
    return event
}

export async function updateEvent( id: string, event: IEvent ) {
    event.id = id

    const index = events.findIndex( e => e.id === id )
    
    if ( ! index ) throw new Exception(404, "Could not find event with that ID")

    events.splice(index,1,event)
}

export async function deleteEvent( id: string ) {

    const index = events.findIndex( e => e.id === id )

    if ( ! index ) throw new Exception(404, "Could not find event with that ID.")
    
    events.splice(index,1)

}