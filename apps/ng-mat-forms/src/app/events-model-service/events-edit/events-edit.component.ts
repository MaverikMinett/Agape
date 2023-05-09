import { Component } from "@angular/core";
import { IEvent, IEventDto } from "../ievent.interface";
import { EventService } from "../event.service";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup } from "@angular/forms";
import { ModelService } from "../model.service";
import { Event } from "lib-platform";
import alchemy from "@project-zed/lib-alchemy";
import { Interface } from "@agape/types";


// function jsDateToUtcTimestamp( dateTime: Date ) {
//     if ( ! dateTime ) return undefined
//     const offset = dateTime.getTimezoneOffset()
//     const utcDate = new Date( dateTime.getTime() - (offset*60*10000) )
//     // const [date] = utcDate.toISOString()
//     console.log( dateTime.toISOString() )
//     console.log( utcDate.toDateString() )
//     return utcDate.toISOString()
// }


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
        timeStart__date: [''],
        timeStart__time: [''],
        timeEnd__date: [''],
        timeEnd__time: [''],
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
                this.patchForm(event)
            },
            error: console.error
        })
    }

    submit() {
        this.transactionLoading = false

        if ( ! this.eventsForm.valid ) 
            throw new Error("Form is not valid")

        const formData: Interface<Event> = this.getPayload()

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

    patchForm( event: Event ) {

        const value: any = {...this.event}

        if ( value.timeStart ) {
            const startDate = new Date(event.timeStart)
            const startTime = startDate.getHours().toString().padStart(2,'0') 
                + ':' + startDate.getMinutes().toString().padStart(2,'0')
            value.timeStart__date = startDate
            value.timeStart__time = startTime    
            delete value.timeStart
        }


        if ( value.timeEnd ) {
            const endDate = new Date(event.timeEnd)
            const endTime = endDate.getHours().toString().padStart(2,'0') 
                + ':' + endDate.getMinutes().toString().padStart(2,'0')
            value.timeEnd__date = endDate
            value.timeEnd__time = endTime    
            delete value.timeEnd
        }

        console.log(value)


        this.eventsForm.patchValue(value)
    }

    getPayload() {
        const value = {...this.eventsForm.value}

        const startDate = value.timeStart__date
        const startTime = value.timeStart__time
        const [ hours, minutes ] = startTime.split(':')
        const startDateTime = new Date(startDate)
        startDateTime.setHours(hours, minutes)

        delete value.timeStart__date
        delete value.timeStart__time

        value.timeStart = startDateTime.toISOString()

        const endDate = value.timeEnd__date ?? value.timeStart__date
        const endTime = value.timeEnd__time
        const endDateTime = endDate ? new Date(endDate) : undefined
        if ( endTime ) {
            const [ endHours, endMinutes ] = endTime.split(':')
            endDateTime.setHours(hours, minutes)
        }
        
        delete value.timeEnd__date
        delete value.timeEnd__time

        value.timeEnd = endDateTime ? endDateTime.toISOString() : undefined

        return value as Interface<Event>
    }
}