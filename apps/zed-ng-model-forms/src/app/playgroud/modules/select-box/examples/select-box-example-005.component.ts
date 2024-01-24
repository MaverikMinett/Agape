import { Component, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Field, ForeignKey, Model, Primary, Document } from "@agape/model";
import { ChoiceFormatterFunction } from "@agape/model";
import { Observable, of } from "rxjs";
import { DynamicFormGroup } from "apps/zed-ng-model-forms/src/app/dynamic-forms/dynamic-form-group";

/* model definitions */
@Model export class FoodItem extends Document {

    @Primary id: string

    @Field name: string
}


@Model export class ExampleForm {
    @ForeignKey(FoodItem)
    @Field foodItem: string
}

/* static data */
const foodItems: FoodItem[] = [
    { id: 'apple', name: 'Apple' },
    { id: 'banana', name: 'Banana' },
    { id: 'lettuce', name: 'Lettuce' },
    { id: 'rotini', name: 'Rotini' },
]

/* service */
@Injectable()
class FoodItemService {

    getFoodItems() {
        return of(foodItems)
    }
}

/* component */
@Component({
    selector: 'select-box-example-005',
    template:`

    <dynamic-form [group]="form">

    </dynamic-form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    `,
    providers: [FoodItemService]
})
export class SelectBoxExample005 {

    form: DynamicFormGroup

    constructor( public service: FoodItemService ) {
        this.form = new DynamicFormGroup(ExampleForm, {
            fields: {
                foodItem: {
                    choices: this.service.getFoodItems(),
                    choicesFormatter: ( food: FoodItem ) => ({value: food.id, label: food.name})
                }
            }
        })
    }

}