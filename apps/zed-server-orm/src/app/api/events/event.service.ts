import { Service } from "@agape/api";
import { db } from '../../../db'
import { IEvent } from "../../interfaces/IEvents";
import { ObjectId } from "mongodb";
import { orm } from '@agape/orm';

import { Event } from './event.model'

@Service()
export class EventService {


    async list() {
        const query = orm.list(Event)
        const events = await query.exec()
        return events
    }

    async create( event: Omit<IEvent, 'id'> ) {
        return orm.insert(Event, event).exec()
    }

    async retrieve( id: string ) {
        return orm.retrieve(Event, id).exec()
    }

    async update( id: string, event: IEvent ) {
        return orm.update(Event, id, event).exec()
    }

    async delete( id: string ) {
        return orm.delete(Event, id).exec()
    }

}