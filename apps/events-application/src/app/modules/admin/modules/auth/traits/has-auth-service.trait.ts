import { stack } from "@agape/object";
import { Injector } from "@angular/core";
import { AuthService } from "../auth.service";


export class HasAuthService {

    injector: Injector

    auth: AuthService

    @stack build() {
        this.auth = this.injector.get(AuthService)
    }

}