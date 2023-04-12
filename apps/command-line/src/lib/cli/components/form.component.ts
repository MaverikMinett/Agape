import { FormField, FormGroup } from "@lib/forms";
import inquirer from 'inquirer';

interface InquirerQuestion {
    type: 'input';
    name: string;
    message: string;
    default?: any;
}


export class CliFormComponent {

    constructor( public form: FormGroup, public value: {[key:string]: any} = {} ) {

    }

    async run() {
        const questions = this.formToInquirerQuestions( this.form, this.value )
        const answers = await inquirer.prompt(questions)
        Object.assign(this.value, answers)
    }

    formToInquirerQuestions( form: FormGroup, value: {[key:string]: any} = {} ) {
        return form.fields.map( field => this.fieldToInquirerQuestion(field, value[field.name] ) )
    }

    fieldToInquirerQuestion( field: FormField, value?: any ) {
        if ( field.type === 'string' ) { 
            const question: InquirerQuestion = {
                'type': 'input',
                'name': field.name,
                'message': field.label,
                'default': value
            }
            return question
        }
    }

}