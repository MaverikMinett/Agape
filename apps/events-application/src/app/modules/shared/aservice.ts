import { Injectable, Injector } from "@angular/core";


@Injectable()
export class AService  {
    public  injector: Injector

    constructor( injector: Injector ) { 
        this.injector = injector
        this.build()
    }

    build() {

    }
}