import { Class } from "@agape/types";
import { Component } from "./decorators";



export class App {


    constructor( private element: HTMLElement, private component: Class  ) {

    }

    draw() {
        const descriptor = Component.descriptor(this.component)
        this.element.innerHTML = descriptor.template
    }


}