import { events } from './events.model'
import { v4 } from 'uuid';

import { Exception } from '@agape/exception';
import { Injectable } from '@agape/api';

@Injectable()
export class EventService {

    list() {
        return events
    }

    create( event: any ) {
        event.id = v4()
        events.push(event)
        return { id: event.id }
    }

    retrieve( id: string ) {
        const event = events.find( e => e.id === id )
        if ( ! event ) throw new Exception(404, `Could not find event with ID ${id}`)
        return event
    }

    update( id: string, event: any ) {
        event.id = id

        const index = events.findIndex( e => e.id === id )
        
        if ( index === -1 ) throw new Exception(404, `Could not find event with ID ${id}`)

        events.splice(index,1,event)
    }

    delete( id: string ) {
        const index = events.findIndex( e => e.id === id )

        if ( index === -1 ) throw new Exception(404, `Could not find event with ID ${id}`)
        
        events.splice(index,1)
    }

}