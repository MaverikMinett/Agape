import { Component } from "@angular/core";
import { Organization } from 'lib-platform'
import { NewOrganizationDialog } from "../new-organization-dialog/new-organization-dialog.component";
import { AComponent } from "../../../../shared/acomponent";
import { Traits } from "../../../../shared/traits";
import { HasDialog } from "../../../../shared/traits/has-dialog";
import { HasModelService } from "../../../../shared/traits/has-model-service";

export interface OrganizationsIndexPageComponent 
extends HasDialog, HasModelService { }

@Component({
    selector: 'admin-organizations-index-page',
    templateUrl: './organizations-index-page.component.html'
})
@Traits( HasDialog, HasModelService )
export class OrganizationsIndexPageComponent extends AComponent {
    
    items: Organization[]

    displayedColumns: string[] = [ 'code', 'name' ];

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

    newOrganization() {
        const ref = this.openDialog(NewOrganizationDialog)

        ref.afterClosed().subscribe( (response) => {
            if (response) {
                this.loadItems()
            }
        })
    }



}