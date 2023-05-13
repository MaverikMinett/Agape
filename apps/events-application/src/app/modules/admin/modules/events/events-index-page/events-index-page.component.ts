import { Component } from "@angular/core";
import { include } from "@agape/object";

import { Event } from 'lib-platform'
import { AComponent } from "../../../../shared/acomponent";
import { HasDialog } from "../../../../shared/traits/has-dialog";
import { NewEventDialog } from "../new-event-dialog/new-event-dialog.component";
import { HasModelService } from "../../../../shared/traits/has-model-service";

export interface EventsIndexPageComponent 
    extends HasDialog, HasModelService { }

@Component({
    selector: 'admin-events-index-page',
    templateUrl: './events-index-page.component.html'
})
@include( HasDialog, HasModelService )
export class EventsIndexPageComponent extends AComponent {
    
    events: Event[]

    displayedColumns: string[] = [
        'name', 'timeStart__date', 'timeStart__time', 'timeEnd__time',
        'locationName', 'contactPhone', 'contactEmail' ];


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