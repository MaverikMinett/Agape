import { Component } from "@angular/core";

import { Enum, Field, Model, Widget } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

@Model export class ExampleForm {
    @Field date: Date
}


@Component({
    selector: 'date-example-001',
    template: `
    <dynamic-form [group]="form">
    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class DateExample001 {

    form = new DynamicFormGroup(ExampleForm)
}