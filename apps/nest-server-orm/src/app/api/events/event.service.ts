import { Injectable } from '@nestjs/common';
import { orm } from '@agape/orm';

import { Interface } from '@agape/types';
import { Event } from 'lib-platform'

@Injectable()
export class EventService {
    list() {
        return orm.list(Event).exec()
    }

    create( event: Interface<Event> ) {
        return orm.insert(Event, event).exec()
    }

    retrieve( id: string ) {
        return orm.retrieve(Event, id).exec()
    }

    update( id: string, event: Interface<Event> ) {
        return orm.update(Event, id, event).exec()
    }

    delete( id: string ) {
        return orm.delete(Event, id).exec()
    }
}
