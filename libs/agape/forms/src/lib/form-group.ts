import { FormField } from "./form-field"


export type FormGroupValue = { [key:string]: any }

export class FormGroup {

    fields: FormField[] = []

    value: FormGroupValue = {}

    get answers() { return this.value }
    set answers( value: FormGroupValue ) { this.value = value }

    constructor( value?: FormGroupValue ) {
        if ( value !== undefined ) this.value = value
    }

    /**
     * If the form group contains the field
     * @param fieldName The name of the field
     * @returns Boolean
     */
    has( fieldName: string ) {
        return !! this.get( fieldName )
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
     * Update the form field values
     * @param value 
     */
    patchValue( value: FormGroupValue ) {
        for ( let field of this.fields ) {
            this.value[field.name] = value[field.name]
        }
    }

    /**
     * Set the value of the form field
     */
    setValue( ): FormGroupValue
    setValue( value: FormGroupValue ): this
    setValue( value?: FormGroupValue): this|FormGroupValue {
        if ( value !== undefined ) {
            this.value = value
            return this
        }
        else return this.value
    }

 



}

