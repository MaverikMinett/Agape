import { FormGroup } from "@agape/forms";
import { CliFormControl } from "../controls/form.control";

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