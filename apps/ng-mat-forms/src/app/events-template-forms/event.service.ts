import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { IEventDto } from './ievent.interface'

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

    list(): Observable<IEventDto[]> {
        return this.http.get<IEventDto[]>( `${this.apiUrl}/events` )
    }

    create(item: IEventDto) {
        return this.http.post<{id: string}>( `${this.apiUrl}/events`, item )
    }

    retrieve(id: string): Observable<IEventDto> {
        return this.http.get<IEventDto>( `${this.apiUrl}/events/${id}` )
    }

    update(id: string, item: IEventDto) {
        return this.http.put( `${this.apiUrl}/events/${id}`, item )
    }

    delete(id: string) {
        return this.http.delete<IEventDto>( `${this.apiUrl}/events/${id}` )
    }

}