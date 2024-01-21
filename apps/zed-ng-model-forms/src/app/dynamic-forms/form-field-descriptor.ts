

export class FormFieldDescriptor {

    widget: string = 'input'

    type: string = 'string'

    label: string

    min: number

    max: number

    choices: Choice[]

}

export interface Choice {
    value: any
    label: string
    item?: any
}