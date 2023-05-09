import { Component } from "@angular/core";


class Foo {

    timeStart: Date = new Date()

    timeEnd: Date = new Date()

}


@Component({
    templateUrl: './date-control-with-template-form.component.html',
})
export class DateControlWithTemplateFormComponent {

    foo: Foo = new Foo()


    constructor( ) {
        
    }

    submit() {
        console.log( this.foo )
    }


}