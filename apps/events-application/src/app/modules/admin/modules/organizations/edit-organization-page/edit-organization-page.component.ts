import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Organization } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'admin-edit-organization-page',
    templateUrl: './edit-organization-page.component.html'
})
export class EditOrganizationPageComponent {
    
    id: string
    item: Organization

    form = new FormBuilder().group({
        code: ['', Validators.required],
        name: ['', Validators.required],
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
                    this.openSnackBar("Saved")
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

    openSnackBar(message: string) {
        this.snackbar.open(message, undefined, { duration: 1500 })
    }

}