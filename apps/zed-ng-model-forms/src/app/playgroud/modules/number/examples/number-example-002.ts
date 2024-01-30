import { Component } from "@angular/core";

import { Field, Integer, Model } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

@Model export class ExampleForm {
    @Integer
    @Field integer: number
}


@Component({
    selector: 'number-example-002',
    template: `
    <dynamic-form [group]="form">
    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class NumberExample002 {

    form = new DynamicFormGroup(ExampleForm)
}