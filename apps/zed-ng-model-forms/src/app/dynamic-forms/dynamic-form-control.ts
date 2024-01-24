import { Choice, FieldDescriptor, getFieldValidator } from "@agape/model"
import { AbstractControl, Validators } from "@angular/forms"
import { enumToChoices } from "./dynamic-forms-util"


export class DynamicFormControl {

    widget: string = 'input'

    type: string = 'string'

    label: string

    min: number

    max: number

    choices: Choice[]

    required: boolean

    /* textarea */
    autosize?: boolean

    minRows?: number

    maxRows?: number

    rows?: number

    /* date */
    minDate?: Date|string

    maxDate?: Date|string

    constructor( 
        field: FieldDescriptor, 
        ngControl: AbstractControl ) {
        
        this.buildFormControlFromFieldDescriptor( field )
        this.bindFieldValidator( field, ngControl )    
    }

    buildFormControlFromFieldDescriptor( field: FieldDescriptor ) {
        this.widget = field.widget ?? 'input'
        this.type = field.type ?? 'string'

        if ( field.label ) this.label = field.label
        if ( this.required ) this.required = field.required

        /* number */
        if ( field.type === 'number' ) {
            this.min = field.min
            this.max = field.max
        }
        
        /* textarea */
        if ( field.widget === 'textarea' ) {
            this.autosize = field.autosize
            if ( field.autosize ) {
                this.minRows = field.minRows
                this.maxRows = field.maxRows
            }
            else {
                this.rows = field.rows
            }
        }

        if ( field.choices ) this.choices = field.choices
        else if ( field.enum ) this.choices = enumToChoices( field.enum )
    }


    private bindFieldValidator( field: FieldDescriptor, ngControl: AbstractControl ) {
        ngControl.clearValidators()

        const controlValidator = this.getControlValidator( field, ngControl )
        ngControl.addValidators( controlValidator )

        if ( this.required ) {
            ngControl.addValidators( Validators.required )
        }

        ngControl.updateValueAndValidity()
    }

    private  getControlValidator( field: FieldDescriptor, ngControl: AbstractControl ) {
        const parent = ngControl.parent
        const validator = getFieldValidator( field )

        function controlValidator (control: AbstractControl) {
            const instance = parent.value
            const value = control.value
            const { valid, error } = validator(instance, value)
            if ( valid ) { return null }
            else { 
                return { field: error }
            }
        }

        return controlValidator
    }
}
