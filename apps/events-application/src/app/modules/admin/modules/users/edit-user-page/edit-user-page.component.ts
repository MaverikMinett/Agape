import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { User } from 'lib-platform'
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Interface } from "@agape/types";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
    selector: 'admin-edit-user-page',
    templateUrl: './edit-user-page.component.html'
})
export class EditUserPageComponent {
    
    id: string
    item: User

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
                    this.openSnackBar("Saved")
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

    openSnackBar(message: string) {
        this.snackbar.open(message, undefined, { duration: 1500 })
    }

}