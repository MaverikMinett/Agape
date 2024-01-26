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
    selector: 'select-box-example-009',
    template:`
    <form [formGroup]="form">
        <dynamic-form-field 
        [model]="model" 
        field="foodItem"
        [choices]="$foodItems"
        [choiceFormatter]="foodItemChoiceFormatter"
        (change)="onChange($event)"
        ></dynamic-form-field>
        <div class="text-gray-500 text-sm">
            {{ form.value | json }}
        </div>
    </form>

    <div class="rounded overflow-hidden w-full bg-slate-200 p-2 mt-3">
        <h3 class="text-sm text-slate-400 mb-1">
            Change events
        </h3>
        <div *ngFor="let change of changes" class="text-xs text-slate-400 ml-3">
            {{ change }}
        </div>
    <div>

    `,
    providers: [FoodItemService]
})
export class SelectBoxExample009 {

    model = ExampleForm

    changes: string[] = []

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

    onChange( event: any ) {
        this.changes.push("Select box changed")
    }



}