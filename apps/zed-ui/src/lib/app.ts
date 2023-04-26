import { Class } from "@agape/types";



export class App {


    rootComponent: Class

    constructor( private element: HTMLElement ) {

    }

    draw() {
        this.element.innerHTML = "Goodbye world"
    }


}