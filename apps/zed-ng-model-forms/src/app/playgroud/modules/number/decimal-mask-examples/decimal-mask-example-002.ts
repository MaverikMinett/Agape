import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

/* using ngModel */

@Component({
    selector: 'decimal-mask-example-002',
    template: `
    <div class="flex">
        <div class="mr-6">
            <form [formGroup]="form">
                <div class="form-control">
                <label class="mr-3">Decimal input</label>
                    <input formControlName="value" type="number" decimals="2" step=".1" [input]="form.value.value">
                </div>
            </form>
            <div class="text-gray-500 text-sm">
                {{ form.value | json }}
            </div>
        </div>
        <div>
            <button (click)="resetValue()" class="py-1 px-2 bg-blue-500 text-white rounded">
                Reset Value
            </button>
        </div>
    </div>
    `,
    styles: [
        `input { text-align: right; }`
    ]
})
export class DecimalMaskExample002 {

    form: FormGroup = new FormBuilder().group({
        value: [1]
    })

    resetValue() {
        this.form.patchValue({value: 2})
    }
}