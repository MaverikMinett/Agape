import { ChoiceFormatterFunction, Model, ModelDescriptor } from "@agape/model";
import { Class } from "@agape/types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

export interface DynamicFormGroupOptions<T> {
    fields?: { [K in keyof T]?: DynamicFormGroupFieldOptions }
}

export interface DynamicFormGroupFieldOptions {
    choices?: any[]|Observable<any[]>|Promise<any[]>
    choiceFormatter?: ChoiceFormatterFunction
}

export class DynamicFormGroup<T extends Class=Class> {

    ngFormGroup: FormGroup

    model: T

    options: DynamicFormGroupOptions<T> = { }

    private modelDescriptor: ModelDescriptor

    private _fieldNames: string[]

    get fieldNames() {
        return this._fieldNames
    }

    constructor( model: T, options?: DynamicFormGroupOptions<InstanceType<T>> ) {
        const descriptor = Model.descriptor(model)
        if ( ! descriptor ) {
            throw new Error(`${model.name} is not a valid Model`)
        }

        this.model = model
        this.modelDescriptor = descriptor
        this.buildNgFormGroup()
        this._fieldNames = descriptor.fields.all().map( field => field.name )
        this.mergeOptions( options )
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

    private mergeOptions( options: DynamicFormGroupOptions<T> ) {
        if ( options ) {
            if ( options.fields ) {
                this.options.fields ??= { }
                for ( const fieldName of Object.keys(options.fields) ) {
                    this.options.fields[fieldName] ??= {}
                    this.options.fields[fieldName] = {...this.options.fields[fieldName], ...options.fields[fieldName]}
                }
            }
        }
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

    markAsPristine() {
        return this.ngFormGroup.markAsPristine()
    }
}