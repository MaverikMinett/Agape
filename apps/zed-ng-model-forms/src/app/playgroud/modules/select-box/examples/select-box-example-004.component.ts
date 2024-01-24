import { Component, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Field, ForeignKey, Model, Primary, Document } from "@agape/model";
import { ChoiceFormatterFunction } from "@agape/model";
import { Observable, of } from "rxjs";

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

    async getFoodItems() {
        return foodItems
    }
}

/* component */
@Component({
    selector: 'select-box-example-004',
    template:`
    <form [formGroup]="form">
        <dynamic-form-field 
        [model]="model" 
        field="foodItem"
        [choices]="$foodItems"
        [choiceFormatter]="foodItemChoiceFormatter"
        ></dynamic-form-field>
        <div class="text-gray-500 text-sm">
            {{ form.value | json }}
        </div>
    </form>
    `,
    providers: [FoodItemService]
})
export class SelectBoxExample004 {

    model = ExampleForm

    foodItemChoiceFormatter: ChoiceFormatterFunction = ( foodItem: FoodItem ) => {
        return { value: foodItem.id, label: foodItem.name }
    }

    form: FormGroup = new FormBuilder().group({
        foodItem: [null]
    })

    $foodItems: Promise<FoodItem[]>

    constructor( public service: FoodItemService ) {
        this.$foodItems = this.service.getFoodItems()
    }





}