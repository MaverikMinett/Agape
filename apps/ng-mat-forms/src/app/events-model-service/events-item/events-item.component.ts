import { Component } from "@angular/core";
import { IEvent, IEventDto } from "../ievent.interface";
import { EventService } from "../event.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'project-zed-events-item',
    templateUrl: './events-item.component.html',
})
export class EventsItemComponent {

    event: IEventDto

    

    constructor( 
        private service: EventService,
        private route: ActivatedRoute ,
        private router: Router ) {

    }

    ngOnInit() {
        this.route.params.subscribe( params => this.loadEvent(params.id) )
    }

    loadEvent( id: string ) {
        this.service.retrieve( id ).subscribe({
            next: event => this.event = event,
            error: console.error
        })
    }

    deleteEvent( id: string ) {

        this.service.delete(id).subscribe({
            next: () => {
                this.router.navigate(['/events/list'])
            },
            error: (error) => {
                console.error(error)
            }
        })
    }
}