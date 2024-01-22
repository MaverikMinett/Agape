import { Model, ModelDescriptor } from "@agape/model";
import { Class } from "@agape/types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";



export class DynamicFormGroup {

    ngFormGroup: FormGroup

    model: Class

    private modelDescriptor: ModelDescriptor

    private _fieldNames: string[]

    get fieldNames() {
        return this._fieldNames
    }

    constructor( model: Class ) {
        const descriptor = Model.descriptor(model)
        if ( ! descriptor ) {
            throw new Error(`${model.name} is not a valid Model`)
        }

        this.model = model
        this.modelDescriptor = descriptor
        this.buildNgFormGroup()
        this._fieldNames = descriptor.fields.all().map( field => field.name )
    }
    
    private buildNgFormGroup( ) {

        const ngFormBuilderArgs: any = { }

        for ( const field of this.modelDescriptor.fields.all() ) {
            const validators = []
            if ( field.required ) validators.push( Validators.required )
            ngFormBuilderArgs[field.name] = [null, validators]
        }

        const ngFormGroup = new FormBuilder().group(ngFormBuilderArgs)

        this.ngFormGroup = ngFormGroup
    }

    get dirty() {
        return this.ngFormGroup.dirty
    }

    get valid() {
        return this.ngFormGroup.valid
    }

    get value() {
        return this.ngFormGroup.value
    }
}