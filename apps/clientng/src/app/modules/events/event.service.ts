import { Injectable } from "@angular/core";

import { Event, events } from './events.model'

import { v4 } from 'uuid'

import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class EventService {

    list(): Observable<Event[]> {
        const immutable = []
        for ( let event of events ) {
            const copy = JSON.parse(JSON.stringify(event))
            immutable.push(copy)
        }
        return of(immutable)
    }

    create(item: Event) {
        item.id = v4()
        events.push(item)
        return of(undefined).pipe( delay(500) )
    }

    retrieve(id: string): Observable<Event> {
        const event = events.find( event => event.id === id)
        const copy = JSON.parse(JSON.stringify(event))
        return of(copy).pipe( delay(1500) )
    }

    update(id: string, item: Event) {
        const event = events.find( event => event.id === id )

        if ( ! event ) 
            throw new Error(`Could not find event with id ${id}`)
        
        const index = events.indexOf(event)
        events.splice(index,1,item)
        return of(undefined)
    }

    delete(id: string) {
        const event = events.find( event => event.id === id )

        if ( ! event ) 
            throw new Error(`Could not find event with id ${id}`)
        
        const index = events.indexOf(event)
        events.splice(index,1)
        return of()
    }

}