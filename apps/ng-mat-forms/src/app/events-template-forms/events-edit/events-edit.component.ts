import { Component } from "@angular/core";
import { IEvent } from "../ievent.interface";
import { EventService } from "../event.service";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'project-zed-events-edit',
    templateUrl: './events-edit.component.html',
    styleUrls: ['./events-edit.component.scss']
})
export class EventsEditComponent {

    id: string
    event: IEvent

    transactionLoading: boolean = false

    fb = new FormBuilder()

    constructor(
         private service: EventService, 
         private router: Router,
         private route: ActivatedRoute,
          ) {

    }

    ngOnInit() {
        this.route.params.subscribe( params => {
            if ( ! params.id ) {
                this.event = { name: "" }    
            } 
            else {
                this.id = params.id
                this.loadEvent(params.id) 
            }
            
        })
    }

    loadEvent( id: string ) {
        this.service.retrieve( id ).subscribe({
            next: event => this.event = event,
            error: console.error
        })
    }

    submit() {
        this.transactionLoading = false

        if ( this.event.id ) {
            this.service.update(this.id, this.event).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/events/${this.id}`])
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
                    this.router.navigate([`/events/${result.id}`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }

    }
}