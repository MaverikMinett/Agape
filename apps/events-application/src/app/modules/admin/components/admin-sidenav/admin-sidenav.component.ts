import { Component } from "@angular/core";
import { Traits } from "../../../shared/traits";
import { HasAuthService } from "../../modules/auth";
import { HasRouter } from "../../../shared/traits/has-router";
import { AComponent } from "../../../shared/acomponent";


export interface AdminSidenavComponent extends 
    HasAuthService,
    HasRouter
    { };

@Component({
    selector: 'admin-sidenav',
    templateUrl: './admin-sidenav.component.html'
})
@Traits( HasAuthService, HasRouter )
export class AdminSidenavComponent extends AComponent {

    logout() {
        this.auth.logout()
        this.router.navigate(['/'])
    }
}