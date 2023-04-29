import { Component } from "../../decorators/component";
import { ElementRef } from "../../element-ref";
import { Router } from "./router";


@Component({
    'selector': 'router-outlet',
    'template': "Router outlet works."
})
export class RouterOutletComponent {


    constructor( private el: ElementRef ) {

        // this.el.nativeElement.innerHTML = "Working double time"

    }

    onInit() {

    }

}