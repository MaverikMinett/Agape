import { FormGroup } from "./form-group"

/**
 * Create forms with the form builder object
 */
export class FormBuilder {

    /**
     * Create a new form group with a string field
     * @param name Field name
     * @param label Field label
     * @param length Field length
     */
    string( name: string, label?: string, length?: number ): FormGroup 
    string( ...args: any[] ): FormGroup {
        const f = new FormGroup()
        return f.string(...(args as [string, string, number]) )
    }

    /**
     * Create a new form group with a string field
     * @param name Field name
     * @param label Field label
     */
    number( name: string, label?: string): FormGroup 
    number( ...args: any[] ): FormGroup {
        const f = new FormGroup()
        return f.number(...(args as [string, string]) )
    }

}

export const fb = new FormBuilder();
export default fb;
