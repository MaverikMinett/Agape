import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Event } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AComponent } from "../../../../shared/acomponent";
import { Traits } from "../../../../shared/traits";
import { HasModelService } from "../../../../shared/traits/has-model-service";
import { HasConfirmationService } from "../../../../shared/modules/confirmation/has-confirmation.trait";
import { HasSnackbar } from "../../../../shared/traits/has-snackbar";

export interface EditEventPageComponent extends 
    HasModelService,
    HasConfirmationService,
    HasSnackbar { }

@Component({
    selector: 'admin-edit-event-page',
    templateUrl: './edit-event-page.component.html'
})
@Traits( HasModelService, HasConfirmationService, HasSnackbar )
export class EditEventPageComponent extends AComponent {
    
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

    private route: ActivatedRoute = this.injector.get(ActivatedRoute)
    private router: Router = this.injector.get(Router)


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
                    this.snackbarMessage("Saved")
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

    delete() {
        const ref = this.confirmationService.confirm(
            `Are you sure you want to delete event ${this.item.name}?`, 
            { 
                okText: "Yes, delete",
                okStyle: 'primary-destructive',
            }
        )


        
        ref.afterClosed().subscribe( (confirmed: boolean) => {
            if ( confirmed ) {
                this.transactionLoading = true
                this.service.delete(Event, this.id).subscribe({
                    next: () => {
                        this.transactionLoading = false
                        this.snackbarMessage("Deleted event")
                        this.router.navigate([`/admin/events`])
                    },
                    error: (error) => {
                        this.transactionLoading = false
                        console.error(error)
                    } 
                })
            }
        })
    }


}