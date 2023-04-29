import { ComponentHarness } from "../../component-harness";
import { Component } from "../../decorators/component";
import { ElementRef } from "../../element-ref";
import { Router } from "./router";


@Component({
    'selector': 'router-outlet',
    'template': "Router outlet works."
})
export class RouterOutletComponent {


    constructor( private router: Router, private el: ElementRef ) {

        this.router.onNavigateToComponent().subscribe( (context) => {
            console.log("DISPLAY COMPONENT FOR ", context )

            const harness = new ComponentHarness( context.moduleContext, context.component )

            el.nativeElement.innerHTML = ''
            el.nativeElement.appendChild( harness.dom )
        })

        

    }

    onInit() {

    }

}