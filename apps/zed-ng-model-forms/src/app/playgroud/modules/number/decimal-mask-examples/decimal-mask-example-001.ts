import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

/* using ngModel */

@Component({
    selector: 'decimal-mask-example-001',
    template: `
    <div class="flex">
        <div class="mr-6">
            <form>
                <div class="form-control">
                    <label class="mr-3">Decimal input</label>
                    <input type="number" name="number" decimals="2" step=".1" [(ngModel)]="value" [input]="value">
                </div>
            </form>
            <div class="text-gray-500 text-sm">
                {{ value }}
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
export class DecimalMaskExample001 {

    value: number = 1

    resetValue() {
        this.value = 2
    }
}