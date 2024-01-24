import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Enum, Field, Model } from "@agape/model";

export enum FoodType {
    Fruit = 'fruit',
    Vegetable = 'vegetable',
    Pasta = 'pasta'
}

@Model export class ExampleForm {
    @Enum(FoodType)
    @Field({ label: 'Food type'}) field1: FoodType
}


@Component({
    selector: 'select-box-example-001',
    template: `
    <form [formGroup]="form">
        <dynamic-form-field [model]="model" field="field1"></dynamic-form-field>
        <div class="text-gray-500 text-sm">
            {{ form.value | json }}
        </div>
    </form>
    `,
})
export class SelectBoxExample001 {

    model = ExampleForm

    form: FormGroup = new FormBuilder().group({
        field1: [null]
    })

}