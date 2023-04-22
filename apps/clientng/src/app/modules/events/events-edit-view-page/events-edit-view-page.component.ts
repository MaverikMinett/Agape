import { Component } from "@angular/core";
import { Event } from '../events.model'
import { EventService } from '../event.service'
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, finalize } from 'rxjs';

import fb, { FormGroup } from '@agape/forms'

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

    form: FormGroup

    constructor( 
        public service: EventService,
        public route: ActivatedRoute,
        public router: Router
         ) {
        this.form = fb.string('name')
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params) => {
                    this.id = params['id']
                    if ( this.id ) this.retrieveEvent( this.id )
                    else this.event = { name: '' }
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

        if ( this.event.id ) {
            this.service.update(this.id, this.event).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/events/view/${this.id}`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
        else {
            this.service.create(this.event).subscribe({
                next: ( result ) => {
                    this.transactionLoading = false
                    this.router.navigate([`/events/view/${result.id}`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }

    }
    
}