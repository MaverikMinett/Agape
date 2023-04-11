
import { events, Event } from './model';
import { v4 } from 'uuid';

export async function saveEvent( item: Event ) {
    if ( item.id ) await updateEvent( item.id, item )
    else await createEvent( item )
    return { 'message': `Event saved` }
}

export async  function updateEvent( id: string, item: Event ) {
    let index  = -1;

    const record = events.find( r => { index += 1; return r.id === id } )

    if ( ! record ) throw new Error(`Could not find event with id ${item.id}`)

    events[index] = item;
}

export async function createEvent( item: Event ) {
    (item.id) || (item.id=v4())
    events.push( item )
}
