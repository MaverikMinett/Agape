import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { User } from 'lib-platform'
import { NewUserDialog } from "../new-user-dialog/new-user-dialog.component";
import { HasDialog } from "../../../../shared/traits/has-dialog";
import { Traits } from "../../../../shared/traits";
import { AComponent } from "../../../../shared/acomponent";
import { HasModelService } from "../../../../shared/traits/has-model-service";

export interface UsersIndexPageComponent 
    extends HasDialog, HasModelService { }

@Component({
    selector: 'admin-users-index-page',
    templateUrl: './users-index-page.component.html'
})
@Traits( HasDialog, HasModelService )
export class UsersIndexPageComponent extends AComponent {
    
    items: User[]

    displayedColumns: string[] = [ 'username', 'name' ];
 
    ngOnInit() {
        this.loadItems()
    }

    loadItems() {
        this.service.list(User).subscribe({ 
            next: items  => {
                this.items = items
                console.log( this.items )
            },
            error: console.error
        })
    }

    newUser() {
        const ref = this.openDialog(NewUserDialog)

        ref.afterClosed().subscribe( (response) => {
            if (response) {
                this.loadItems()
            }
        })
    }




}