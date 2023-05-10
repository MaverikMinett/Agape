import { Component } from "@angular/core";
import { ModelService } from "../model.service";

import { Event } from 'lib-platform'

@Component({
    selector: 'project-zed-events-list',
    templateUrl: './events-list.component.html',
})
export class EventsListComponent {

    events: Event[] = []

    constructor( private service: ModelService ) {

    }

    ngOnInit() {
        this.service.list(Event).subscribe({ 
            next: events => {
                console.log("EVENTS", events)
                this.events = events
            },
            error: console.error
        })
    }
}