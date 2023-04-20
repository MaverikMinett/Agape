import { Component } from "@angular/core";
import { Event } from '../events.model'
import { EventService } from '../event.service'
import { ActivatedRoute, Router } from "@angular/router";

import { finalize } from 'rxjs';

@Component({
    selector: 'app-events-edit-view-page',
    templateUrl: './events-edit-view-page.component.html',
    host: { class: 'page' }
})
export class EventsEditViewPageComponent {

    id: string
    event: Event

    requestLoading: boolean = false
    transactionLoading: boolean = false

    constructor( 
        public service: EventService,
        public route: ActivatedRoute,
        public router: Router
         ) {

    }

    ngOnInit() {
        this.requestLoading = true

        this.route.params
            .subscribe(
                (params) => {
                    this.id = params['id']
                    this.retrieveEvent( this.id )
                }
            )
    }

    retrieveEvent( id: string ) {
        this.requestLoading = true
        this.service.retrieve(id).subscribe({
            next: (event) => {
                this.event = event
                this.requestLoading = false
            },
            error: (error) => {
                this.requestLoading = false
                console.error(error)
            }
        })
    }

    submit() {
        this.transactionLoading = false
        this.service.update(this.id, this.event)
        .subscribe({
            next: () => {
                console.log("Success")
                this.transactionLoading = false
                this.router.navigate([`/events/view/${this.id}`])
            },
            error: (error) => {
                console.log("Error")
                this.transactionLoading = false
                console.error(error)
            }
        })
    }
    
}