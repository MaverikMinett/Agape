import { verbalize, camelize } from '@agape/string'

interface FormFieldParams {
  type?: string;
  name?: string;
  label?: string;
  length?: number;
}

export type FormFieldType = 'string'|'number'

export class FormField {
    type: string;
    name: string;
    label: string;
    length: number;

    constructor( type: FormFieldType, name: string, label?: string, params?: FormFieldParams ) {
        if ( 
            (name === undefined || name === null) 
            && (label === undefined || label == null )
            ) {
            throw new Error("Cannot create field without a name or a label")
        }

        if ( label === undefined ) label = verbalize(name)
        if ( name === undefined ) name = camelize(label)

        this.type = type
        this.name = name
        this.label = label 
        if ( params ) Object.assign(this, params)
    }
}


export type FormGroupValue = { [key:string]: any }

export class FormGroup {

    fields: FormField[] = []

    value: FormGroupValue = {}

    get answers() { return this.value }
    set answers( value: FormGroupValue ) { this.value = value }
    
    patchValue( value: FormGroupValue ) {
        Object.assign(this.value, value)
    }

    setValue( ): FormGroupValue
    setValue( value: FormGroupValue ): this
    setValue( value?: FormGroupValue): this|FormGroupValue {
        if ( value !== undefined ) {
            this.value = value
            return this
        }
        else return this.value
    }

    /**
    * Create a number field
    * @param name  Name of the field
    * @param label  Label for the field
    */
    number( name: string, label?: string ): this 
    number( ...args: any[] ): this {
        const fieldType = 'number';
        let name: string;
        let label: string;
        
        [ name, label ] = args

        const field = new FormField(fieldType, name, label )
        this.fields.push(field)
        return this
    }

    /**
    * Create a text field
    * @param name Name of the field
    * @param label Label for the field
    * @param length Length of field in characters
    */
    string( name: string, label?: string, length?: number ): this 
    string( ...args: any[] ): this {
        const fieldType = 'string';
        let name: string;
        let label: string;
        let length: number;
        [ name, label, length ] = args

        if ( length === undefined ) length = 256

        const field = new FormField(fieldType, name, label, { length } )
        this.fields.push(field)
        return this
    }

    /**
     * Retrieve a field by name
     * @param fieldName The name of the field
     * @returns FormField
     */
    get( fieldName: string ) {
        return this.fields.find( f => f.name === fieldName )
    }

    /**
     * If the form group contains the field
     * @param fieldName The name of the field
     * @returns Boolean
     */
    has( fieldName: string ) {
        return !! this.get( fieldName )
    }
}

