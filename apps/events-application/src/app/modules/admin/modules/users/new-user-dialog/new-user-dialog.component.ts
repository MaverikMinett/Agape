import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModelService } from "../../../../shared/model.service";
import { User, UserStatusChoices } from "lib-platform";
import { Interface } from "@agape/types";
import { AComponent } from "../../../../shared/acomponent";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'new-user-dialog-component',
    templateUrl: './new-user-dialog.component.html'
})
export class NewUserDialog extends AComponent {
    form = new FormBuilder().group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        status: ['', Validators.required]
    })

    transactionLoading: boolean = false

    choices = { UserStatusChoices }
    
    private service: ModelService
    private dialog: MatDialogRef<NewUserDialog>

    build() {
        this.service = this.injector.get(ModelService)
        this.dialog  = this.injector.get(MatDialogRef)
    }

    submit() {
        this.transactionLoading = false

        const user = {...this.form.value } as Interface<User>

        this.service.create(User, user).subscribe({
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