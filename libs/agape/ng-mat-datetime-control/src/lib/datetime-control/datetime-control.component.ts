import { Component, Input, forwardRef } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimeControlComponent),
    multi: true
};

@Component({
    selector: 'ag-mat-datetime-control',
    templateUrl: './datetime-control.component.html',
    styleUrls: ['./datetime-control.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatetimeControlComponent implements ControlValueAccessor {

    @Input() required: boolean = false

    @Input() dateLabel: string

    @Input() timeLabel: string

    //The internal data model
    private innerValue: Date 

    innerDate: Date
    innerTime: string

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {

        if ( ! value ) value = undefined

        if (value !== this.innerValue) {
            this.innerValue = value;
            this.innerDate = new Date(value)
            this.innerTime =  this.innerDate.getHours().toString().padStart(2,'0') 
            + ':' +  this.innerDate.getMinutes().toString().padStart(2,'0')
        }

    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    dateChanged( value: Date ) {
        
        if ( ! value ) {
            this.innerValue = undefined
        }
        else {
            const [ year, month, day ] = [ value.getFullYear(), value.getMonth(), value.getDay() ]
            if ( ! this.innerValue ) {
                this.innerValue = new Date()
                const { hours, minutes } = this.getInnerTime()
                this.innerValue.setHours(hours, minutes, 0)
            }
            this.innerValue.setFullYear(year, month, day)
        }
        this.onChangeCallback(this.innerValue);
    }

    timeChanged( value: string ) {
        const { hours, minutes } = this.getInnerTime()
        if ( ! this.innerValue ) {
            this.innerValue = new Date()
        }
        this.innerValue.setHours(hours, minutes, 0)

        this.onChangeCallback(this.innerValue);
    }

    private getInnerTime() {
        let hours: number
        let minutes: number
        if ( ! this.innerTime ) {
            hours = 0
            minutes = 0
        }
        else {
            const [h,m] = this.innerTime.split(':')
            hours = Number(h)
            minutes = Number(m)
        }
        return { hours, minutes }
    }

}

