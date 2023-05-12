import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { Organization } from 'lib-platform'


@Component({
    selector: 'admin-organizations-index-page',
    templateUrl: './organizations-index-page.component.html'
})
export class OrganizationsIndexPageComponent {
    
    items: Organization[]


    displayedColumns: string[] = [ 'name' ];
 
    constructor( public service: ModelService) {

    }

    ngOnInit() {

        this.service.list(Organization).subscribe({ 
            next: items  => {
                this.items = items
                console.log( this.items )
            },
            error: console.error
        })
    }



}