import { EventEmitter } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";


export interface AugmentedAbstractControl extends AbstractControl {

    valuePatched: EventEmitter<any>

}

export interface AugmentedFormGroup extends FormGroup {
    controls: {
        [key: string]: AugmentedAbstractControl
    }
}