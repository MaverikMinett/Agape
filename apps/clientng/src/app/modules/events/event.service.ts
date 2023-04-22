import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Event, events } from './events.model'

import { v4 } from 'uuid'

import { Observable, of } from 'rxjs';
import { ApiSelectorService } from "../api-selector/api-selector.service";

@Injectable({ providedIn: 'root'})
export class EventService {

    apiUrl: string

    constructor( 
        private apiSelector: ApiSelectorService,
        private http: HttpClient
        ) {
            this.apiSelector.selected().subscribe(
                api => this.apiUrl = api.url
            )
    }

    list(): Observable<Event[]> {
        return this.http.get<Event[]>( `${this.apiUrl}/events` )
    }

    create(item: Event) {
        item.id = v4()
        events.push(item)
        return of(undefined)
    }

    retrieve(id: string): Observable<Event> {
        return this.http.get<Event>( `${this.apiUrl}/events/${id}` )
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