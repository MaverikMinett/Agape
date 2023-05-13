import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModelService } from "../../../../shared/model.service";
import { Organization } from "lib-platform";
import { Interface } from "@agape/types";
import { AComponent } from "../../../../shared/acomponent";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'new-organization-dialog-component',
    templateUrl: './new-organization-dialog.component.html'
})
export class NewOrganizationDialog extends AComponent {
    form = new FormBuilder().group({
        code: ['', Validators.required],
        name: ['', Validators.required],
    })

    transactionLoading: boolean = false
    
    private service: ModelService
    private dialog: MatDialogRef<NewOrganizationDialog>

    build() {
        this.service = this.injector.get(ModelService)
        this.dialog  = this.injector.get(MatDialogRef)
    }

    submit() {
        this.transactionLoading = false

        if ( ! this.form.valid ) 
            throw new Error("Form is not valid")

        const organization = {...this.form.value } as Interface<Organization>


        this.service.create(Organization, organization).subscribe({
            next: ( result ) => {
                this.transactionLoading = false
                this.notify('create')
            },
            error: (error) => {
                this.transactionLoading = false
                console.error(error)
            }
        })

    }

	close( return_value=null ) {
		this.dialog.close( return_value )
	}

    notify( action=null, item=null ) {
		let response = { 'action': action }
		this.close( response )
	}

    // openSnackBar(message: string) {
    //     this.snackbar.open(message, undefined, { duration: 1500 })
    // }
}