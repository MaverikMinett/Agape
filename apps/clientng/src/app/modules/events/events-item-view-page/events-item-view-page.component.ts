import { Component } from "@angular/core";
import { Event } from '../events.model'
import { EventService } from '../event.service'
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector: 'app-events-item-view-page',
    templateUrl: './events-item-view-page.component.html',
    host: { class: 'page' }
})
export class EventsItemViewPageComponent {

    id: string
    event: Event

    requestLoading: boolean
    deleteTransactionLoading: boolean

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

    deleteEvent( id: string ) {
        this.deleteTransactionLoading = true
        this.service.delete(id).subscribe({
            next: () => {
                this.router.navigate(['/events/list'])
                this.requestLoading = false
            },
            error: (error) => {
                this.requestLoading = false
                console.error(error)
            }
        })
    }
}