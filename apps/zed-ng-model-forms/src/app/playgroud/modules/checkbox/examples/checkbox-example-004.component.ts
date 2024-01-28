import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Elements, Enum, Field, Label, Model, Required, Widget } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";
import { MatCheckboxChange } from "@angular/material/checkbox";

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

    @Field disabled: boolean

    @Elements(Topping, { minElements: 2 })
    @Widget('checkboxes')
    @Required
    @Field toppings: Topping[]
}

@Component({
    selector: 'checkbox-example-004',
    template: `
    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class CheckboxExample004 {

    form = new DynamicFormGroup(ExampleForm)

    constructor() {
        this.form.configure({
            fields: {
                disabled: {
                    on: {
                        change: (event: MatCheckboxChange ) => {
                            this.form.configure({
                                fields: {
                                    toppings: {
                                        disabled: event.checked
                                    }
                                }
                            })
                        }
                    }
                }
            }
        })
    }

}