import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModelService } from "../../../../shared/model.service";
import { Event } from "lib-platform";
import { Interface } from "@agape/types";
import { AComponent } from "../../../../shared/acomponent";
import { MatDialogRef } from "@angular/material/dialog";
import { ADialog } from "../../../../shared/adialog";

@Component({
    selector: 'new-event-dialog-component',
    templateUrl: './new-event-dialog.component.html'
})
export class NewEventDialog extends ADialog {

    private service: ModelService

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


    build() {
        super.build()
        this.service = this.injector.get(ModelService)
    }

    submit() {
        this.transactionLoading = false

        const event = {...this.form.value } as Interface<Event>

        this.service.create(Event, event).subscribe({
            next: ( result ) => {
                event.id = result.id
                this.transactionLoading = false
                this.notify('create',event)
            },
            error: (error) => {
                this.transactionLoading = false
                console.error(error)
            }
        })

    }


}