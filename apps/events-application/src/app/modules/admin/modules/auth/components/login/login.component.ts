import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Traits } from "apps/events-application/src/app/modules/shared/traits";
import { HasAuthService } from "../../traits/has-auth-service.trait";
import { ICredentials } from "../../interfaces/credentials.interface";
import { AComponent } from "apps/events-application/src/app/modules/shared/acomponent";
import { HasActivatedRoute } from "apps/events-application/src/app/modules/shared/traits/has-activated-route";
import { HasRouter } from "apps/events-application/src/app/modules/shared/traits/has-router";

export interface LoginComponent extends 
    HasAuthService,
    HasActivatedRoute,
    HasRouter
    { }

@Component({
    selector: 'admin-login',
    templateUrl: './login.component.html'
})
@Traits( HasAuthService, HasActivatedRoute, HasRouter )
export class LoginComponent extends AComponent {

    transactionLoading: boolean = false

    form: FormGroup = new FormBuilder().group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    nextUrl: string = '/admin'

    ngOnInit() {
        this.route.params.subscribe( params => {
            if ( params.next ) this.nextUrl = params.next
        })
    }

    submit() {
        const credentials: ICredentials = this.form.value

        this.auth.login(credentials).subscribe( () => {
            this.router.navigate([this.nextUrl])
        })
    }

}