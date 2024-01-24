import { Component, Injectable } from "@angular/core";
import { Field, ForeignKey, Model, Primary, Document, Enum, Required } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

/* SELECT MULTIPLE ENUMS */

enum Topping {
    ExtraCheese = 'extra-cheese',
    Mushroom = 'mushroom',
    Onion = 'onion',
    Pepperoni = 'pepperoni',
    Pineapple = 'pineapple',
    Sausage = 'sausage',
    Tomato = 'tomato'
}

@Model export class ExampleForm {
    @Required()
    @Enum(Topping)
    @Field([String], { minLength: 1, maxLength: 3 }) toppings: Topping[]
}


/* component */
@Component({
    selector: 'select-box-example-006',
    template:`

    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class SelectBoxExample006 {

    form: DynamicFormGroup

    constructor(  ) {
        this.form = new DynamicFormGroup(ExampleForm)
    }

}