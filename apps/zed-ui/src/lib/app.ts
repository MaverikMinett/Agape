import { Class } from "@agape/types";
import { ComponentHarness } from "./component-harness";


export class App {


    constructor( private element: HTMLElement, private component: Class  ) {

    }

    draw() {

        const harness = new ComponentHarness(this.component)

        this.element.appendChild( harness.dom )

        harness.updateDomWithExpressionValues()
    }


}

