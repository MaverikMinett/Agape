import { FormGroup } from "@agape/forms";
import { CliFormControl } from "../controls/form.control";

/**
 * Form component
 */
export class CliFormComponent {

    constructor( public name: string, public form: FormGroup ) {

    }

    /**
     * Run the form component
     */
    async run() {
        const control = new CliFormControl(this.form)
        const answer = await control.run()
        return { 
            form: { [this.name]: answer }
        }

    }

}