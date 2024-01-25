import { Component, Injectable } from "@angular/core";
import { Field, Model, Primary, Document, Enum, Required, Foreign, DesignType, Elements } from "@agape/model";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";
import { of } from "rxjs";

/* SELECT MULTIPLE OBJECTS */

@Model class Topping extends Document {
    @Primary id: string;
    @Field name: string;
}

@Model export class ExampleForm {
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
    selector: 'select-box-example-007',
    template:`

    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
    providers: [
        ToppingService
    ]
})
export class SelectBoxExample007 {

    form: DynamicFormGroup

    constructor( toppingService: ToppingService ) {
        this.form = new DynamicFormGroup(ExampleForm, {
            fields: {
                toppings: {
                    choices: toppingService.getToppings(),
                    choiceFormatter: ( topping: Topping) => ({ value: topping.id, label: topping.name })
                }
            }
        })
    }

}