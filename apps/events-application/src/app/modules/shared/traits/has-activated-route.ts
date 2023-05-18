import { stack } from "@agape/object";
import { Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


export class HasActivatedRoute {

    injector: Injector

    route: ActivatedRoute

    @stack build() {
        this.route = this.injector.get(ActivatedRoute)
    }

}