import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Organization } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Traits } from "../../../../shared/traits";
import { HasModelService } from "../../../../shared/traits/has-model-service";
import { HasConfirmationService } from "../../../../shared/modules/confirmation";
import { HasSnackbar } from "../../../../shared/traits/has-snackbar";
import { AComponent } from "../../../../shared/acomponent";

export interface EditOrganizationPageComponent extends 
    HasModelService,
    HasConfirmationService,
    HasSnackbar { }

@Component({
    selector: 'admin-edit-organization-page',
    templateUrl: './edit-organization-page.component.html'
})
@Traits( HasModelService, HasConfirmationService, HasSnackbar )
export class EditOrganizationPageComponent extends AComponent {
    
    id: string
    item: Organization

    form = new FormBuilder().group({
        code: ['', Validators.required],
        name: ['', Validators.required],
    })

    transactionLoading: boolean = false
 
    private route: ActivatedRoute = this.injector.get(ActivatedRoute)
    private router: Router = this.injector.get(Router)

    ngOnInit() {
        this.route.params.subscribe( 
            ({id}: {id:string}) => {
                this.id = id

                this.service.retrieve(Organization, id).subscribe({ 
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

        const organization = {...this.form.value } as Interface<Organization>

        if ( this.id ) {
            this.service.update(Organization, this.id, organization).subscribe({
                next: () => {
                    this.transactionLoading = false
                    this.router.navigate([`/admin/organizations`])
                    this.snackbarMessage("Saved")
                },
                error: (error) => {
                    this.transactionLoading = false
                    console.error(error)
                }
            })
        }
        else {
            this.service.create(Organization, organization).subscribe({
                next: ( result ) => {
                    this.transactionLoading = false
                    this.router.navigate([`/admin/organizations`])
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
            `Are you sure you want to delete organization ${this.item.name}?`, 
            { 
                okText: "Yes, delete",
                okStyle: 'primary-destructive',
            }
        )


        
        ref.afterClosed().subscribe( (confirmed: boolean) => {
            if ( confirmed ) {
                this.transactionLoading = true
                this.service.delete(Organization, this.id).subscribe({
                    next: () => {
                        this.transactionLoading = false
                        this.snackbarMessage("Deleted organization")
                        this.router.navigate([`/admin/organizations`])
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