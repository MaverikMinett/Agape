import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Traits } from "apps/events-application/src/app/modules/shared/traits";
import { HasAuthService } from "../../traits/has-auth-service.trait";
import { AComponent } from "apps/events-application/src/app/modules/shared/acomponent";
import { ICredentials } from "../../interfaces/credentials.interface";

export interface LoginComponent extends HasAuthService { }

@Component({
    selector: 'admin-login',
    templateUrl: './login.component.html'
})
@Traits( HasAuthService )
export class LoginComponent extends AComponent {

    transactionLoading: boolean = false

    form: FormGroup = new FormBuilder().group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    submit() {
        const credentials: ICredentials = this.form.value

        this.auth.login(credentials).subscribe( () => {
            
        })
    }

}