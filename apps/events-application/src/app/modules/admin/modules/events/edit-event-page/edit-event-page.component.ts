import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Event } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'admin-edit-event-page',
    templateUrl: './edit-event-page.component.html'
})
export class EditEventPageComponent {
    
    id: string
    item: Event

    form = new FormBuilder().group({
        name: [''],
        timeStart: [undefined],
        timeEnd: [undefined],
        locationName: [""],
        locationAddress: [""],
        contactPhone: [""],
        contactEmail: [""],
        description: [""],
    })

    transactionLoading: boolean = false
 
    constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private service: ModelService,
        private snackbar: MatSnackBar
        ) {

    }

    ngOnInit() {
        this.route.params.subscribe( 
            ({id}: {id:string}) => {
                this.id = id

                this.service.retrieve(Event, id).subscribe({ 
                    next: item  => {
                        this.item = item
                        this.form.patchValue(item)
                    },
                    error: console.error
                })
            }
        )
    }

    submit() {
        this.transactionLoading = false

        if ( ! this.form.valid ) 
            throw new Error("Form is not valid")

        const event = {...this.form.value } as Interface<Event>

        if ( this.id ) {
            this.service.update(Event, this.id, event).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/admin/events`])
                    this.openSnackBar("Saved")
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
                    this.router.navigate([`/admin/events`])
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
    }

    openSnackBar(message: string) {
        this.snackbar.open(message, undefined, { duration: 1500 })
    }

}