import { FormField, FormGroup } from "@lib/forms";
import inquirer from 'inquirer';

interface InquirerQuestion {
    type: 'input';
    name: string;
    message: string;
    default?: any;
}


export class CliFormComponent {

    

    constructor( public form: FormGroup ) {

    }

    async run() {
        const value = this.form.value
        const questions = this.formToInquirerQuestions( this.form )
        const answers = await inquirer.prompt(questions)
        this.form.patchValue(answers)
    }

    formToInquirerQuestions( form: FormGroup ) {
        return form.fields.map( field => this.fieldToInquirerQuestion(field, this.form.answers[field.name] ) )
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
        return undefined
    }

}