import { verbalize, camelize } from '@agape/string'

interface FormFieldParams {
  type?: string;
  name?: string;
  label?: string;
  length?: number;
}

class FormField {
  type: string;
  name: string;
  label: string;
  length: number;

  constructor( type: string, name: string, label: string, params?: FormFieldParams ) {
      this.type = type
      this.name = name
      this.label = label 
      if ( params ) Object.assign(this, params)
  }
}

export class FormGroup {
   fields: FormField[] = []

    number( name: string, label: string ) {
        const field = new FormField('input', name, label)
    }
    string( ...args: any[] ): this{
        let name: string;
        let label: string;
        let length: string;
        const fieldType: string = 'string';

        [ name, label, length ] = args

        if ( 
            (name === undefined || name === null) 
            && (label === undefined || label == null )
            ) {
            throw new Error("Cannot create field without a name or a label")
        }

        label ??= verbalize(name)
        name  ??= camelize(label)

        const field = new FormField('string', name, label, { length: 256 } )
        this.fields.push(field)
        return this
    }

    has( fieldName: string ) {
        return !! this.fields.find( f => f.name === fieldName )
    }
}

