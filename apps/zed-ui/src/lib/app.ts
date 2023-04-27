import { Class } from "@agape/types";
import { Component } from "./decorators";
import { ComponentDescriptor } from "./descriptors";



export class App {


    constructor( private element: HTMLElement, private component: Class  ) {

    }

    draw() {

        const harness = new ComponentHarness(this.component)

        this.element.appendChild( harness.dom )

        // this.element.innerHTML = harness.htmlTemplate
    }


}


export class ComponentHarness<T extends Class> {

    descriptor: ComponentDescriptor

    instance: InstanceType<T>

    htmlTemplate: string

    dom: HTMLElement
    
    constructor(public component: T) {

        this.descriptor = Component.descriptor(this.component)

        this.instance = new component()

        this.htmlTemplate = this.descriptor.template

        this.dom = this.parseTemplate( this.htmlTemplate )
    }


    parseTemplate( htmlTemplate: string ) {

        const dom = document.createElement(this.descriptor.selector)

        dom.innerHTML = htmlTemplate

        return dom
    }


}