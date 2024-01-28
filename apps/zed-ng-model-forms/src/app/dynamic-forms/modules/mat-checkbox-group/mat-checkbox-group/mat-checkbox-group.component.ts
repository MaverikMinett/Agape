import { Choice } from "@agape/model";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
    selector: 'mat-checkbox-group',
    templateUrl: './mat-checkbox-group.component.html',
    styleUrls: ['./mat-checkbox-group.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: MatCheckboxGroupComponent
        },
    ]
})
export class MatCheckboxGroupComponent implements  ControlValueAccessor {

    value: any[] = []

    onChange = (quantity) => { };

    onTouched = () => {};
  
    touched = false;
  
    disabled = false;

    @Input() choices: Choice[]

    @Output() change: EventEmitter<any> = new EventEmitter()

    onCheckboxChange(event:MatCheckboxChange, checkboxValue: any) {
        this.markAsTouched()
        this.value ??= [ ]
        if ( event.checked ) {
            this.value.push(checkboxValue)
        }
        else {
            const index = this.value.indexOf(checkboxValue)
            if ( index > -1 ) {
                this.value.splice(index,1)
            }
        }
        this.onChange(this.value)
        this.change.emit(this.value)
    }

    writeValue(selectedOptions: any[]) {
        if ( selectedOptions ) {
            this.value = [...selectedOptions]
        }
        else {
            this.value = selectedOptions
        }
        
    }
    
    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

}