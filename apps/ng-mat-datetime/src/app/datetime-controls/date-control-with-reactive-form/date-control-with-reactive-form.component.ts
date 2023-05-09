import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";


class Foo {

    timeStart: Date = new Date()

    timeEnd: Date = new Date()

}

@Component({
    templateUrl: './date-control-with-reactive-form.component.html',
    styleUrls: ['./date-control-with-reactive-form.component.scss']
})
export class DateControlWithReactiveFormComponent {

    foo: Foo = new Foo()

    fb = new FormBuilder()

    form = this.fb.group({
        timeStart: [undefined],
        timeEnd: [undefined],
    })

    constructor( ) {
        this.form.patchValue(this.foo)
    }

    submit() {
        console.log( this.form.value )
    }

}