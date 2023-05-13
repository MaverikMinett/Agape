import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Organization } from 'lib-platform'
import { MatDialog } from "@angular/material/dialog";
import { NewOrganizationDialog } from "../new-organization-dialog/new-organization-dialog.component";
import { Class } from "@agape/types";


@Component({
    selector: 'admin-organizations-index-page',
    templateUrl: './organizations-index-page.component.html'
})
export class OrganizationsIndexPageComponent {
    
    items: Organization[]


    displayedColumns: string[] = [ 'code', 'name' ];
 
    constructor( 
        public service: ModelService,
        public dialog: MatDialog
        ) {

    }

    ngOnInit() {
        this.loadItems()
    }

    loadItems() {
        this.service.list(Organization).subscribe({ 
            next: items  => {
                this.items = items
                console.log( this.items )
            },
            error: console.error
        })
    }

    openDialog( dialog: Class ) {
        const ref = this.dialog.open(dialog, {
            panelClass: 'reactive'
        })
        
        return ref
    }

    newOrganization() {
        const ref = this.openDialog(NewOrganizationDialog)

        ref.afterClosed().subscribe( (response) => {
            if (response) {
                this.loadItems()
            }
        })
    }



}