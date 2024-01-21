import { FieldDescriptor, Model, ModelDescriptor } from "@agape/model";
import { Class } from "@agape/types";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormFieldDescriptor } from "../form-field-descriptor";
import { enumToChoices } from "../dynamic-forms-util";
import { ControlValueAccessor, FormControl } from "@angular/forms";


@Component({
    selector: 'dynamic-form-field',
    templateUrl: './dynamic-form-field.component.html',
    styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnChanges {

    @Input() model: Class

    @Input() field: string

    modelDescriptor: ModelDescriptor

    modelFieldDescriptor: FieldDescriptor

    formFieldDescriptor: FormFieldDescriptor


    ngOnChanges(changes: SimpleChanges): void {

        const modelDescriptor = Model.descriptor(this.model)

        if ( ! modelDescriptor ) {
            throw new Error(`${this.model.name} is not a valid model`)
        }

        let modelFieldDescriptor: FieldDescriptor

        if ( modelDescriptor.fields.has(this.field) ) {
            modelFieldDescriptor = modelDescriptor.field(this.field)
        }
        else {
            throw new Error(`${this.field} is not a field of ${this.model.name}`)
        }

        this.modelDescriptor = modelDescriptor
        this.modelFieldDescriptor = modelFieldDescriptor

        this.buildFormFieldDescriptor()
    }

    ngOnInit() {
        // console.log("--------->", this.formControl)
    }

    buildFormFieldDescriptor() {
        const formField = new FormFieldDescriptor()
        formField.widget = this.modelFieldDescriptor.widget ?? 'input'
        formField.label = this.modelFieldDescriptor.label
        formField.type = this.modelFieldDescriptor.type ?? 'string'
        formField.min = this.modelFieldDescriptor.min
        formField.max = this.modelFieldDescriptor.max
        formField.choices = this.modelFieldDescriptor.choices

        if (this.modelFieldDescriptor.enum) {
            formField.choices = enumToChoices(this.modelFieldDescriptor.enum)
        }

        console.log(this.modelFieldDescriptor, formField)

        this.formFieldDescriptor = formField

    }
}