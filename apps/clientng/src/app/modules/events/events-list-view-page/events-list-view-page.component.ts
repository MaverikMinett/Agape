import { Component } from "@angular/core";
import { Event } from '../events.model'
import { EventService } from '../event.service'



@Component({
    selector: 'app-events-list-view-page',
    styleUrls: ['./events-list-view-page.component.scss'],
    templateUrl: './events-list-view-page.component.html',
    host: { class: 'page' }
})
export class EventsListViewPageComponent {

    events: Event[] = []

    constructor( public service: EventService ) {

    }

    ngOnInit() {
        this.service.list().subscribe(
            (events) => this.events = events,
            (error) => {
                console.error(error)
            }
        )
    }
    
}