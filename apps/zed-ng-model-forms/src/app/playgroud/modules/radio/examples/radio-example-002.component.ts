import { Component } from "@angular/core";

import { Default, Enum, Field, Model, Widget } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";


export enum WidgetType {
    Select = 'select',
    Radio = 'radio'
}

export enum CrustType {
    White = 'white',
    Wheat = 'wheat',
    Cauliflower = 'cauliflower'
}

@Model export class ExampleForm {

    @Enum(WidgetType)
    @Default(WidgetType.Select)
    @Widget('radio')
    @Field widget: WidgetType

    @Enum(CrustType)
    @Field crust: CrustType

}


@Component({
    selector: 'radio-example-002',
    template: `
    <dynamic-form [group]="form">
    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
})
export class RadioExample002 {

    form = new DynamicFormGroup(ExampleForm, {
        fields: {
            widget: {
                on: {
                    'change': () => {
                        this.form.configure({
                            fields: {
                                crust: {
                                    widget: this.form.value.widget
                                }
                            }
                        })
                    }
                }
            }
        }
    })
}