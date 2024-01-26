import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Elements, Enum, Field, Label, Model, Widget } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

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
    @Elements(Topping)
    @Widget('checkboxes')
    @Field toppings: Topping[]
}

@Component({
    selector: 'checkbox-example-003',
    template: `
    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class CheckboxExample003 {

    form = new DynamicFormGroup(ExampleForm)

    constructor() {
        this.form.configure({
            fields: {
                toppings: {
                    disabled: true
                }
            }
        })
    }

}