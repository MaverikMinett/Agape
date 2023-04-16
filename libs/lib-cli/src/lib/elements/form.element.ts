import { FormGroup } from "@lib/forms";



export class CliFormElement {

    form: FormGroup

    run() {

        for ( let field of this.form.fields ) {
            console.log( field.name )
        }

    }

}