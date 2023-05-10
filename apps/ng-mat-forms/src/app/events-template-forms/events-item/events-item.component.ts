import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelService } from "../model.service";
import { Event } from "lib-platform";


@Component({
    selector: 'project-zed-events-item',
    templateUrl: './events-item.component.html',
})
export class EventsItemComponent {

    event: Event

    
    constructor( 
        private service: ModelService,
        private route: ActivatedRoute ,
        private router: Router ) {

    }

    ngOnInit() {
        this.route.params.subscribe( params => this.loadEvent(params.id) )
    }

    loadEvent( id: string ) {
        this.service.retrieve(Event, id ).subscribe({
            next: event => {

                console.log("RETRIEVE event", event)
                this.event = event
            } ,
            error: console.error
        })
    }

    deleteEvent( id: string ) {

        this.service.delete(Event, id).subscribe({
            next: () => {
                this.router.navigate(['/events/list'])
            },
            error: (error) => {
                console.error(error)
            }
        })
    }
}