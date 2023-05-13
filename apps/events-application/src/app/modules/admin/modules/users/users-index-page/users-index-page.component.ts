import { Component } from "@angular/core";
import { ModelService } from "../../../../shared/model.service";

import { User } from 'lib-platform'


@Component({
    selector: 'admin-users-index-page',
    templateUrl: './users-index-page.component.html'
})
export class UsersIndexPageComponent {
    
    items: User[]


    displayedColumns: string[] = [ 'username', 'name' ];
 
    constructor( public service: ModelService) {

    }

    ngOnInit() {
        this.service.list(User).subscribe({ 
            next: items  => {
                this.items = items
                console.log( this.items )
            },
            error: console.error
        })
    }



}