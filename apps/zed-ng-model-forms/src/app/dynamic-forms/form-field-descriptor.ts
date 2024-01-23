

export class FormFieldDescriptor {

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
}

export interface Choice {
    value: any
    label: string
    item?: any
}