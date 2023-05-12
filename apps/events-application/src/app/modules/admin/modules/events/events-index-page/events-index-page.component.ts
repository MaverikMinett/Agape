import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Event } from 'lib-platform'


@Component({
    selector: 'admin-events-index-page',
    templateUrl: './events-index-page.component.html'
})
export class EventsIndexPageComponent {
    
    events: Event[]


    displayedColumns: string[] = [
        'name', 'timeStart__date', 'timeStart__time', 'timeEnd__time',
        'locationName', 'contactPhone', 'contactEmail' ];
 
    constructor( public service: ModelService) {

    }

    ngOnInit() {
        console.log("Events Index page")

        this.service.list(Event).subscribe({ 
            next: events  => {
                this.events = events
                console.log( this.events )
            },
            error: console.error
        })
    }



}