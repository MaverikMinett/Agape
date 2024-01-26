import { Choice } from "@agape/model";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'mat-checkbox-group-example-001',
    template: `
    <form [formGroup]="form">
        <mat-checkbox-group [choices]="choices" [formControl]="form.controls['toppings']"></mat-checkbox-group>
    </form>
    <div class="text-gray-500 text-sm">
        {{ form.value | json }}
    </div>
    <div class="rounded w-full bg-slate-300 p-2 my-2">
        <span class="rounded bg-slate-200 mr-2 py-1 px-2">
            <span class="mr-1">Dirty:</span>
            <span [ngClass]="{ 'text-red-500': ! form.controls['toppings'].dirty, 'text-green-500': form.controls['toppings'].dirty }">
                {{ form.dirty }}
            </span>
        </span>
        
        <span class="rounded bg-slate-200 mr-2 py-1 px-2">
            <span class="mr-1">Valid:</span>
            <span [ngClass]="{ 'text-red-500': ! form.controls['toppings'].valid, 'text-green-500': form.controls['toppings'].valid }">
                {{ form.valid }}
            </span>
        </span>
    </div>
    <div class="action-area">
        <button (click)="submit()" 
            class="btn btn-blue"
            [ngClass]="{'btn-disabled': ! form.valid || ! form.dirty}"
            [disabled]="! form.valid || ! form.dirty">
                Submit
        </button>
    </div>
    `,
})
export class MatCheckboxGroupExample001 {

    choices: Choice[] = [
        { value: 'extra-cheese', label: 'Extra cheese' },
        { value: 'mushroom', label: 'Mushroom' },
        { value: 'onion', label: 'Onion' },
        { value: 'pepperoni', label: 'Pepperoni' },
        { value: 'pineapple', label: 'Pineapple' },
        { value: 'sausage', label: 'Sausage' },
        { value: 'tomato', label: 'Tomato' },
    ]

    form = new FormBuilder().group({
        toppings: [ ['sausage'], Validators.required]
    })

    submit() {
        this.form.markAsPristine()
    }

}