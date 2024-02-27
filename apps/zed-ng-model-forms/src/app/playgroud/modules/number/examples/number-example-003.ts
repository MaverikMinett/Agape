import { Component } from "@angular/core";

import { Decimal, Field, Model } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

@Model export class ExampleForm {
    @Decimal(2)
    @Field decimal: number
}


@Component({
    selector: 'number-example-003',
    template: `
    <dynamic-form [group]="form">
    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class NumberExample003 {

    form = new DynamicFormGroup(ExampleForm)
}