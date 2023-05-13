import { Component } from "@angular/core";
import { include } from "@agape/object";

import { Event } from 'lib-platform'
import { AComponent } from "../../../../shared/acomponent";
import { ModelService } from "../../../../shared/model.service";
import { HasDialog } from "../../../../shared/traits/has-dialog";
import { NewEventDialog } from "../new-event-dialog/new-event-dialog.component";

export interface EventsIndexPageComponent extends HasDialog { }



@Component({
    selector: 'admin-events-index-page',
    templateUrl: './events-index-page.component.html'
})
@include( HasDialog )
export class EventsIndexPageComponent extends AComponent {
    
    events: Event[]

    displayedColumns: string[] = [
        'name', 'timeStart__date', 'timeStart__time', 'timeEnd__time',
        'locationName', 'contactPhone', 'contactEmail' ];

    public service = this.injector.get(ModelService)

    ngOnInit() {
        this.loadItems()
    }

    loadItems() {
        this.service.list(Event).subscribe({ 
            next: events  => {
                this.events = events
                console.log( this.events )
            },
            error: console.error
        })
    }


    newEvent() {
        const ref = this.openDialog(NewEventDialog)

        ref.afterClosed().subscribe( (response) => {
            if (response) {
                this.loadItems()
            }
        })
    }


}