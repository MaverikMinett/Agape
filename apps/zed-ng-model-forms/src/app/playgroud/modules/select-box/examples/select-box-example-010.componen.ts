import { Component } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FormBuilder } from "@angular/forms";



interface Topping {
    id: string,
    name: string
}

/* component */
@Component({
    selector: 'select-box-example-010',
    template:`

    <form [formGroup]="form">
        <mat-checkbox formControlName="disabled" (change)="toggleDisabled($event)">
            Disabled
        </mat-checkbox>
        <mat-form-field style="width: 100%">
            <mat-label>Toppings</mat-label>
            <mat-select formControlName="toppings" multiple>
                <mat-option *ngFor="let topping of toppings" [value]="topping.id">
                  {{ topping.name }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    </form>

    <div class="text-gray-500 text-sm">
        <!-- {{ form.value | json }} -->
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
})
export class SelectBoxExample010 {

    form = new FormBuilder().group({
        disabled: [false],
        toppings: [null]
    })

    toppings: Topping[] = [
        { id: 'a', name: 'Extra cheese' },
        { id: 'b', name: 'Mushroom' },
        { id: 'c', name: 'Onion' },
        { id: 'd', name: 'Pepperoni' },
        { id: 'e', name: 'Pineapple' },
        { id: 'f', name: 'Sausage' },
        { id: 'g', name: 'Tomato' },
    ]
    

    changes: string[] = []


    toggleDisabled( event: MatCheckboxChange ) {
        event.checked
        ? this.form.get('toppings').disable()
        : this.form.get('toppings').enable()
    }

}