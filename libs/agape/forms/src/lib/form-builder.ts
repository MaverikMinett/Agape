import { FormGroup } from "./form-group"


export class FormBuilder {

    string( name: string, label?: string, length?: number ): FormGroup 
    string( ...args: any[] ): FormGroup {
        const f = new FormGroup()
        return f.string(...(args as [string, string, number]) )
    }

}

export const fb = new FormBuilder();
export default fb;
