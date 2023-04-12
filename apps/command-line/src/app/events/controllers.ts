
import { events, Event } from './model';
import { v4 } from 'uuid';

export async function saveEvent( item: Event ) {
    if ( item.id ) return updateEvent( item.id, item )
    else return createEvent( item )
    
}

export async  function updateEvent( id: string, item: Event ) {
    let index  = -1;

    const record = events.find( r => { index += 1; return r.id === id } )

    if ( ! record ) throw new Error(`Could not find event with id ${item.id}`)

    events[index] = item;

    return { 'message': `Saved event ${item.name}` }
}

export async function createEvent( item: Event ) {
    (item.id) || (item.id=v4())
    events.push( item )
    
    return { 'message': `Created event ${item.name}` }
}

export async function deleteEvent( id: string ) {
    let index  = -1;

    const record = events.find( r => { index += 1; return r.id === id } )

    events.splice(index, 1)

    return { 'message': `Deleted event ${record.name}` }
}
