import { Component } from "@angular/core";
import { IEvent, IEventDto } from "../ievent.interface";
import { EventService } from "../event.service";
import { ActivatedRoute, Router } from "@angular/router";

import { FormBuilder, FormGroup } from "@angular/forms";


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

    event: IEvent

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

        const event: IEventDto = this.getPayload()

        console.log("Create event", event )

        if ( this.id ) {
            this.service.update(this.id, event).subscribe({
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
            this.service.create(event).subscribe({
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

    patchForm( event: IEventDto ) {
        this.eventsForm.patchValue(event)
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

        return value as IEventDto
    }
}