import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Enum, Field, Label, Model } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";


@Model export class ExampleForm {
    @Label('Agree to terms and conditions')
    @Field agreeToTerms: boolean
}


@Component({
    selector: 'checkbox-example-001',
    template: `
    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class CheckboxExample001 {

    form = new DynamicFormGroup(ExampleForm)



}