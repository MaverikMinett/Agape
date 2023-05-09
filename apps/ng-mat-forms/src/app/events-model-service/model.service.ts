import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { IEventDto } from './ievent.interface'

import { ApiSelectorService } from "../api-selector/api-selector.service";
import { Class, Interface } from "@agape/types";
import { Model } from "@agape/model";
import { map } from 'rxjs';

import { alchemy } from '@project-zed/lib-alchemy'


@Injectable({ providedIn: 'root'})
export class ModelService {

    apiUrl: string

    constructor( 
        private apiSelector: ApiSelectorService,
        private http: HttpClient
        ) {
            this.apiSelector.selected().subscribe(
                api => this.apiUrl = api.url
            )
    }

    // list<T extends Class>( model: T ): Observable<Array<InstanceType<T>>> {
    list<T extends Class>( model: T ) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.plural
        return this.http.get<Array<Interface<InstanceType<T>>>>( `${this.apiUrl}/${endpoint}` )
            .pipe<Array<InstanceType<T>>>( 
                map( items => items.map( item => alchemy.inflate(model, item) ) )
             )
    }

    create<T extends Class>( model: T, item: InstanceType<T> ) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.plural
        const observable = this.http.post<{id: string}>( `${this.apiUrl}/${endpoint}`, item )
        return observable
    }

    retrieve<T extends Class>( model: T, id: string) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.plural
        return this.http.get<Interface<InstanceType<T>>>( `${this.apiUrl}/${endpoint}/${id}` )
        .pipe<InstanceType<T>>( 
            map( item =>  alchemy.inflate(model, item)  )
         )
    }

    update<T extends Class>( model: T, id: string, item: InstanceType<T> ) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.plural
        return this.http.put( `${this.apiUrl}/${endpoint}/${id}`, item )
    }

    delete<T extends Class>( model: T, id: string) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.plural
        return this.http.delete<IEventDto>( `${this.apiUrl}/${endpoint}/${id}` )
    }

}