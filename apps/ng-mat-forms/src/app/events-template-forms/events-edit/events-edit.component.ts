import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ModelService } from "../model.service";
import { Event } from "lib-platform";


@Component({
    selector: 'project-zed-events-edit',
    templateUrl: './events-edit.component.html',
    styleUrls: ['./events-edit.component.scss']
})
export class EventsEditComponent {

    id: string

    event: Event

    transactionLoading: boolean = false

    constructor(
         private service: ModelService, 
         private router: Router,
         private route: ActivatedRoute,
          ) {

    }

    ngOnInit() {
        this.route.params.subscribe( params => {
            if ( ! params.id ) {
                this.event = new Event()   
            } 
            else {
                this.id = params.id
                this.loadEvent(params.id) 
            }
            
        })
    }

    loadEvent( id: string ) {
        this.service.retrieve(Event, id ).subscribe({
            next: event => {
                this.event = event
            },
            error: console.error
        })
    }

    submit() {
        this.transactionLoading = false

        if ( this.id ) {
            this.service.update(Event, this.id, this.event).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/events-model-service/${this.id}`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
        else {
            this.service.create(Event, this.event).subscribe({
                next: ( result ) => {
                    this.transactionLoading = false
                    this.router.navigate([`/events-model-service/${result.id}`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
    }

}