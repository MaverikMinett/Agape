import { FormGroup } from "@lib/forms";

export class CliFormComponent {

    form: FormGroup

    run() {

        for ( let field of this.form.fields ) {

            console.log( field.label )

        }

    }

    


}