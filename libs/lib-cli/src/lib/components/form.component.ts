import { FormGroup } from "@lib/forms";
import { CliFormControl } from "../controls/form.control";

interface InquirerQuestion {
    type: 'input';
    name: string;
    message: string;
    default?: any;
}


export class CliFormComponent {

    constructor( public name: string, public form: FormGroup ) {

    }

    async run() {
        const control = new CliFormControl(this.form)
        const answer = await control.run()
        return { 
            form: { [this.name]: answer }
        }

    }

}