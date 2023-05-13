import { Component, Injector } from "@angular/core";


@Component({template: '' })
export class AComponent  {
    public  injector: Injector

    constructor( injector: Injector ) { 
        this.injector = injector
        this.build()
    }

    build() {

    }
}