import { Component } from "@angular/core";

import { Decimal, Field, Model } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

@Model export class ExampleForm {
    @Decimal(2)
    @Field decimal: number
}


@Component({
    selector: 'number-example-004',
    template: `
    <div class="flex">
        <div class="mr-6 flex-1">
            <dynamic-form [group]="form">
            </dynamic-form>
            <div class="text-gray-500 text-sm">
                {{ form.value | json }}
            </div>
        </div>
        <div>
            <button class="btn btn-blue" (click)="patch()">Patch form</button>
        </div>
    </div>
    `,
})
export class NumberExample004 {

    form = new DynamicFormGroup(ExampleForm)

    patch() {
        this.form.patchValue({ decimal: 2 })
    }
}