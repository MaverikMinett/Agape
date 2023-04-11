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

        label ??= verbalize(name)
        name  ??= camelize(label)

        this.type = type
        this.name = name
        this.label = label 
        if ( params ) Object.assign(this, params)
    }
}

export class FormGroup {
   fields: FormField[] = []

    number( name: string, label: string ) {
        const field = new FormField('number', name, label)
    }

    string( name: string, label?: string, length?: number ): this 
    string( ...args: any[] ): this {
        let name: string;
        let label: string;
        let length: number;
        const fieldType: string = 'string';

        [ name, label, length ] = args

        length ??= 256

        const field = new FormField('string', name, label, { length } )
        this.fields.push(field)
        return this
    }
    
    get( fieldName: string ) {
        return this.fields.find( f => f.name === fieldName )
    }

    has( fieldName: string ) {
        return !! this.get( fieldName )
    }
}

