import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Field, ForeignKey, Model, Primary, Document } from "@agape/model";
import { ChoiceFormatterFunction } from "@agape/model";


@Model export class FoodItem extends Document {

    @Primary id: string

    @Field name: string
}


@Model export class ExampleForm {
    @ForeignKey(FoodItem)
    @Field foodItem: string
}

@Component({
    selector: 'select-box-example-002',
    template:`
    <form [formGroup]="form">
        <dynamic-form-field 
        [model]="model" 
        field="foodItem"
        [choices]="foodItems"
        [choiceFormatter]="foodItemChoiceFormatter"
        ></dynamic-form-field>
        <div class="text-gray-500 text-sm">
            {{ form.value | json }}
        </div>
    </form>
    `
    ,
})
export class SelectBoxExample002 {

    model = ExampleForm

    foodItems: FoodItem[] = [
        { id: 'apple', name: 'Apple' },
        { id: 'banana', name: 'Banana' },
        { id: 'lettuce', name: 'Lettuce' },
        { id: 'rotini', name: 'Rotini' },
    ]

    foodItemChoiceFormatter: ChoiceFormatterFunction = ( foodItem: FoodItem ) => {
        return { value: foodItem.id, label: foodItem.name }
    }

    form: FormGroup = new FormBuilder().group({
        foodItem: [null]
    })

}