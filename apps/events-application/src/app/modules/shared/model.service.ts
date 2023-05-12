import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { Class, Interface } from "@agape/types";
import { Model } from "@agape/model";
import { map } from 'rxjs';

import { alchemy } from '@project-zed/lib-alchemy'


@Injectable({ providedIn: 'root'})
export class ModelService {

    apiUrl: string = 'http://localhost:3007/api'

    constructor( 
        private http: HttpClient
        ) {

    }

    // list<T extends Class>( model: T ): Observable<Array<InstanceType<T>>> {
    list<T extends Class>( model: T ) {
        const descriptor = Model.descriptor(model)

        console.log(descriptor)

        const endpoint   = descriptor.tokens
        return this.http.get<Array<Interface<InstanceType<T>>>>( `${this.apiUrl}/${endpoint}` )
            .pipe<Array<InstanceType<T>>>( 
                map( items => items.map( item => alchemy.inflate(model, item) ) )
             )
    }

    create<T extends Class>( model: T, item: InstanceType<T> ) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.tokens
        const observable = this.http.post<{id: string}>( `${this.apiUrl}/${endpoint}`, item )
        return observable
    }

    retrieve<T extends Class>( model: T, id: string) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.tokens
        return this.http.get<Interface<InstanceType<T>>>( `${this.apiUrl}/${endpoint}/${id}` )
        .pipe<InstanceType<T>>( 
            map( item =>  alchemy.inflate(model, item)  )
         )
    }

    update<T extends Class>( model: T, id: string, item: InstanceType<T> ) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.tokens
        return this.http.put( `${this.apiUrl}/${endpoint}/${id}`, item )
    }

    delete<T extends Class>( model: T, id: string) {
        const descriptor = Model.descriptor(model)
        const endpoint   = descriptor.tokens
        return this.http.delete( `${this.apiUrl}/${endpoint}/${id}` )
    }

}