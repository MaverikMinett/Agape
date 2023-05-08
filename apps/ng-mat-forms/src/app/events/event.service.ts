import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { IEvent } from './ievent.interface'

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

    list(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>( `${this.apiUrl}/events` )
    }

    create(item: IEvent) {
        return this.http.post<{id: string}>( `${this.apiUrl}/events`, item )
    }

    retrieve(id: string): Observable<IEvent> {
        return this.http.get<IEvent>( `${this.apiUrl}/events/${id}` )
    }

    update(id: string, item: IEvent) {
        return this.http.put( `${this.apiUrl}/events/${id}`, item )
    }

    delete(id: string) {
        return this.http.delete<IEvent>( `${this.apiUrl}/events/${id}` )
    }

}