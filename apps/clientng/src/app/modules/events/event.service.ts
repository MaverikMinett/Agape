import { Injectable } from "@angular/core";

import { Event, events } from './events.model'

import { v4 } from 'uuid'

import { Observable, of } from 'rxjs';

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
        return of()
    }

    retreive(id: string): Observable<Event> {
        const event = events.find( event => event.id === id)
        const copy = JSON.parse(JSON.stringify(event))
        return of(copy)
    }

    update(id: string, item: Event) {
        const event = events.find( event => event.id === id )

        if ( ! event ) 
            throw new Error(`Could not find event with id ${id}`)
        
        const index = events.indexOf(event)
        events.splice(index,1,item)
    }

    delete(id: string) {
        const event = events.find( event => event.id === id )

        if ( ! event ) 
            throw new Error(`Could not find event with id ${id}`)
        
        const index = events.indexOf(event)
        events.splice(index,1)
    }

}