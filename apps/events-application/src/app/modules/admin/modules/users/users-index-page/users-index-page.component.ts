import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { User } from 'lib-platform'
import { NewUserDialog } from "../new-user-dialog/new-user-dialog.component";
import { Class } from "@agape/types";
import { MatDialog } from "@angular/material/dialog";


@Component({
    selector: 'admin-users-index-page',
    templateUrl: './users-index-page.component.html'
})
export class UsersIndexPageComponent {
    
    items: User[]

    displayedColumns: string[] = [ 'username', 'name' ];
 
    constructor( 
        public service: ModelService,
        public dialog: MatDialog ) {

    }

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

    openDialog( dialog: Class ) {
        const ref = this.dialog.open(dialog, {
            panelClass: 'reactive'
        })
        
        return ref
    }


}