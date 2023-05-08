import { Component } from "@angular/core";
import { IEvent } from "../ievent.interface";
import { EventService } from "../event.service";


@Component({
    selector: 'project-zed-events-list',
    templateUrl: './events-list.component.html',
})
export class EventsListComponent {

    events: IEvent[] = []

    constructor( private service: EventService ) {

    }

    ngOnInit() {
        this.service.list().subscribe({ 
            next: events => this.events = events,
            error: console.error
        })
    }
}