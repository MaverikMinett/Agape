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
