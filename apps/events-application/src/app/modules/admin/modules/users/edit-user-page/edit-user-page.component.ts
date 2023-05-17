import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { User, UserStatus, UserStatusChoices } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";

import { HasModelService } from "../../../../shared/traits/has-model-service";
import { HasConfirmationService } from "../../../../shared/modules/confirmation";
import { HasSnackbar } from "../../../../shared/traits/has-snackbar";
import { Traits } from "../../../../shared/traits";
import { AComponent } from "../../../../shared/acomponent";

export interface EditUserPageComponent extends 
    HasModelService,
    HasConfirmationService,
    HasSnackbar { }

@Component({
    selector: 'admin-edit-user-page',
    templateUrl: './edit-user-page.component.html'
})
@Traits( HasModelService, HasConfirmationService, HasSnackbar )
export class EditUserPageComponent extends AComponent {
    
    id: string
    item: User

    form = new FormBuilder().group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: [''],
        status: ['', Validators.required]
    })

    transactionLoading: boolean = false

    enums = { UserStatus }

    choices = { UserStatusChoices }
 
    private route: ActivatedRoute = this.injector.get(ActivatedRoute)
    private router: Router = this.injector.get(Router)

    ngOnInit() {

        this.route.params.subscribe( 
            ({id}: {id:string}) => {
                this.id = id

                this.service.retrieve(User, id).subscribe({ 
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

        const user = {...this.form.value } as Interface<User>

        if ( this.id ) {
            this.service.update(User, this.id, user).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/admin/users`])
                    this.snackbarMessage("Saved")
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
        else {
            this.service.create(User, user).subscribe({
                next: ( result ) => {
                    this.transactionLoading = false
                    this.router.navigate([`/admin/users`])
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
            `Are you sure you want to delete user ${this.item.name}?`, 
            { 
                okText: "Yes, delete",
                okStyle: 'primary-destructive',
            }
        )


        
        ref.afterClosed().subscribe( (confirmed: boolean) => {
            if ( confirmed ) {
                this.transactionLoading = true
                this.service.delete(User, this.id).subscribe({
                    next: () => {
                        this.transactionLoading = false
                        this.snackbarMessage("Deleted user")
                        this.router.navigate([`/admin/users`])
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