import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup } from "@angular/forms";
import { ModelService } from "../model.service";
import { Event } from "lib-platform";
import alchemy from "@project-zed/lib-alchemy";
import { Interface } from "@agape/types";



@Component({
    selector: 'project-zed-events-edit',
    templateUrl: './events-edit.component.html',
    styleUrls: ['./events-edit.component.scss']
})
export class EventsEditComponent {

    id: string

    event: Event

    transactionLoading: boolean = false

    fb = new FormBuilder()

    eventsForm: FormGroup = this.fb.group({
        name: [''],
        timeStart: [undefined],
        timeEnd: [undefined],
        locationName: [""],
        locationAddress: [""],
        contactPhone: [""],
        contactEmail: [""],
        description: [""],
    })

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
                this.eventsForm.patchValue(event)
            },
            error: console.error
        })
    }

    submit() {
        this.transactionLoading = false

        if ( ! this.eventsForm.valid ) 
            throw new Error("Form is not valid")

        const formData = {...this.eventsForm.value } as Interface<Event>

        const event = alchemy.inflate(Event, formData)

        if ( this.id ) {
            this.service.update(Event, this.id, event).subscribe({
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
            this.service.create(Event, event).subscribe({
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