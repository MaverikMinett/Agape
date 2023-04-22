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
        return this.http.post<{id: string}>( `${this.apiUrl}/events`, item )
    }

    retrieve(id: string): Observable<Event> {
        return this.http.get<Event>( `${this.apiUrl}/events/${id}` )
    }

    update(id: string, item: Event) {
        return this.http.put( `${this.apiUrl}/events/${id}`, item )
    }

    delete(id: string) {
        return this.http.delete<Event>( `${this.apiUrl}/events/${id}` )
    }

}