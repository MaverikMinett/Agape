import { Component, Injector } from "@angular/core";


@Component({template: '' })
export class AComponent  {
    constructor( public injector: Injector ) { 
        this.build()
    }

    build() {
        
    }
}