import { Injectable } from "@agape/api";
import { orm } from '@agape/orm';

import { Event } from 'lib-platform'

@Injectable()
export class EventService {


    async list() {
        const query = orm.list(Event)
        const events = await query.exec()
        return events
    }

    async create( event: Event ) {
        return orm.insert(Event, event).exec()
    }

    async retrieve( id: string ) {
        return orm.retrieve(Event, id).exec()
    }

    async update( id: string, event: Event ) {
        return orm.update(Event, id, event).exec()
    }

    async delete( id: string ) {
        return orm.delete(Event, id).exec()
    }

}