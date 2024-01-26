import { Component, Injectable } from "@angular/core";
import { Field, Model, Primary, Document, Enum, Required, Foreign, DesignType, Elements } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";
import { of } from "rxjs";
import { MatCheckboxChange } from "@angular/material/checkbox";

/* SELECT MULTIPLE OBJECTS */

@Model class Topping extends Document {
    @Primary id: string;
    @Field name: string;
}

@Model export class ExampleForm {

    @Field disabled: boolean

    @Required()
    @Elements(String, { foreign: Topping })
    @Field toppings: string[]
}

const toppings: Topping[] = [
    { id: 'a', name: 'Extra cheese' },
    { id: 'b', name: 'Mushroom' },
    { id: 'c', name: 'Onion' },
    { id: 'd', name: 'Pepperoni' },
    { id: 'e', name: 'Pineapple' },
    { id: 'f', name: 'Sausage' },
    { id: 'g', name: 'Tomato' },
]


@Injectable()
class ToppingService {
    getToppings() {
        return of(toppings)
    }
}


/* component */
@Component({
    selector: 'select-box-example-008',
    template:`
    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    <div class="rounded overflow-hidden w-full bg-slate-200 p-2 mt-3">
        <h3 class="text-sm text-slate-400 mb-1">
            Change events
        </h3>
        <div *ngFor="let change of changes" class="text-xs text-slate-400 ml-3">
            {{ change }}
        </div>
    <div>
    `,
    providers: [
        ToppingService
    ]
})
export class SelectBoxExample008 {

    form: DynamicFormGroup

    changes: string[] = []

    constructor( toppingService: ToppingService ) {
        this.form = new DynamicFormGroup(ExampleForm, {
            fields: {
                disabled: {
                    on: {
                        change: (event: MatCheckboxChange) => {
                            this.changes.push("Check box changed")
                            this.form.configure({
                                fields: {
                                    toppings: {
                                        disabled: event.checked
                                    }
                                }
                            })
                        }
                    }
                },
                toppings: {
                    choices: toppingService.getToppings(),
                    choiceFormatter: ( topping: Topping) => ({ value: topping.id, label: topping.name }),
                    on: {
                        change: () => {
                            this.changes.push("Select box changed")
                        }
                    }
                }
            }
        })
    }

    toggleDisabled( event: MatCheckboxChange ) {
        this.form.configure({
            fields: {
                toppings: {
                    disabled: event.checked
                }
            }
        })
    }

}