import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { IEventDto } from './ievent.interface'

import { ApiSelectorService } from "../api-selector/api-selector.service";
import { Class, Interface } from "@agape/types";
import { Model } from "@agape/model";
import { Serializer } from "@agape/object";
import { map } from 'rxjs';

class Alchemy {

    serializers = new Map()

    register<T extends Class>( type: T, serializer: Serializer ) {
        this.serializers.set(type, serializer)
    }

    inflate<T extends Class>( model: T, flattened: Interface<T>  ) {
        return this.inflateInstance( model, flattened )
    }

    inflateInstance<T extends Class>( model: T, flattened: Interface<T>  ) {

        const descriptor = Model.descriptor(model)

        const fields = descriptor.fields.all()

        const inflated: any = { }

        for ( let field of fields ) {

            const designType = field.designType

            const serializer = this.serializers.get(designType)

            const value = flattened[field.name]

            const inflatedValue = serializer ? serializer.inflate(value) : value

            inflated[field.name] = inflatedValue
        }

        const instance = new model()

        Object.assign(instance, inflated)

        return instance
    }

    deflate<T extends Class>( model: T, instance: InstanceType<T> ) {

    }

}

class DateSerializer extends Serializer {

    inflate(isoString: string) {
        return new Date(isoString)
    }

    deflate(date: Date) {
        return date.toISOString()
    }
}

const alchemy = new Alchemy();
alchemy.register( Date, new DateSerializer() )

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
        return this.http.get( `${this.apiUrl}/${endpoint}/${id}` )
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