import { stack } from "@agape/object";
import { Injector } from "@angular/core";
import { Router } from "@angular/router";


export class HasRouter {

    injector: Injector

    router: Router

    @stack build() {
        this.router = this.injector.get(Router)
    }

}