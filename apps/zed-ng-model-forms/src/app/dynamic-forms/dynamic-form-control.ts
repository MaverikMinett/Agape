import { Choice, FieldDescriptor, getFieldValidator } from "@agape/model"
import { AbstractControl, Validators } from "@angular/forms"
import { enumToChoices } from "./dynamic-forms-util"


export class DynamicFormControl {

    widget: string

    type: string

    label: string

    choices: Choice[]

    required: boolean

    /* number */
    min?: number

    max?: number

    step?: number

    decimals?: number

    /* textarea */
    autosize?: boolean

    minRows?: number

    maxRows?: number

    rows?: number

    /* date */
    minDate?: Date|string

    maxDate?: Date|string

    multi?: boolean

    constructor( 
        field: FieldDescriptor, 
        ngControl: AbstractControl ) {
        
        this.buildFormControlFromFieldDescriptor( field )
        this.bindFieldValidator( field, ngControl )    
    }

    buildFormControlFromFieldDescriptor( field: FieldDescriptor ) {
 
        this.buildTypeAndWidgetFromFieldDescriptor( field )

        if ( field.label ) this.label = field.label
        if ( field.required ) this.required = field.required

        /* number */
        if ( this.type === 'number' ) {
            this.min = field.min
            this.max = field.max
        }

        /* textarea */
        if ( this.widget === 'textarea' ) {
            this.autosize = field.autosize ?? true
            if ( field.autosize ) {
                this.minRows = field.minRows
                this.maxRows = field.maxRows
            }
            else {
                this.rows = field.rows
            }
        }

        if ( field.choices ) this.choices = field.choices
        else if ( this.type === 'array') {
            if ( field.elements?.choices ) {
                this.choices = field.elements.choices
            }
            else if ( field.elements?.enum ) {
                this.choices = enumToChoices( field.elements.enum )
            }
        }
        else if ( field.enum ) this.choices = enumToChoices( field.enum )

        if ( this.type === 'decimal' ) {
            if ( 'step' in field ) {
                this.step = field.step
            }
            else {
                const nZeros = field.decimals - 1
                let zeros = ''
                for ( let i=0; i<nZeros; i++) {
                    zeros += '0'
                }
                this.step = Number(`0.${zeros}1`)
            }
            this.decimals = field.decimals
        }
    }

    buildTypeAndWidgetFromFieldDescriptor( field: FieldDescriptor ) {
        if ( field.type ) this.type = field.type
        if ( field.widget ) this.widget = field.widget

        if ( Array.isArray(field.designType) ) {
            this.type ??= 'array'
            this.multi = true
        }
        else {
            this.type ??= this.getFieldTypeFromDesignType(field.designType)
        }

        if ( this.type === 'object' ) {
            this.widget ??= 'select'
        }
        else if ( this.type === 'boolean' ) {
            this.widget ??= 'checkbox'
        } 
        else if ( this.type === 'text' ) {
            this.widget ??= 'textarea'
        }
        else if ( this.type === 'date' ) {
            this.widget ??= 'date'
        }
        else if ( this.type === 'array' ) {
            this.widget ??= 'select'
        }
        if ( field.foreignKey ) {
            this.widget ??= 'select'
        }
        if ( field.enum ) {
            this.widget ??= 'select'
        }
        this.widget ??= 'input'
    }

    getFieldTypeFromDesignType( designType: any ) {
        let type: string
        if ( designType === Number ) type = 'number'
        else if ( designType === Date ) type = 'date'
        else if ( designType === String ) type = 'string'
        else if ( designType === Boolean ) type = 'boolean'
        else if ( designType instanceof Function && designType.prototype ) {
            type = 'object'
        }
        return type
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

    private getControlValidator( field: FieldDescriptor, ngControl: AbstractControl ) {
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
