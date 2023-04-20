import { Component } from "@angular/core";
import { Event } from '../events.model'
import { EventService } from '../event.service'
import { ActivatedRoute } from "@angular/router";



@Component({
    selector: 'app-events-item-view-page',
    templateUrl: './events-item-view-page.component.html',
    host: { class: 'page' }
})
export class EventsItemViewPageComponent {

    event: Event

    constructor( 
        public service: EventService,
        public route: ActivatedRoute
         ) {

    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const id = params['id']
                this.service.retrieve(id).subscribe(
                    (event) => this.event = event
                )
            }
        )
    }
    
}