import { Component } from "@angular/core";

import { Enum, Field, Model, Widget } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

export enum CrustType {
    White = 'white',
    Wheat = 'wheat',
    Cauliflower = 'cauliflower'
}

@Model export class ExampleForm {
    @Enum(CrustType)
    @Widget('radio')
    @Field crust: CrustType
}


@Component({
    selector: 'radio-example-001',
    template: `
    <dynamic-form [group]="form">
    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class RadioExample001 {

    form = new DynamicFormGroup(ExampleForm)
}