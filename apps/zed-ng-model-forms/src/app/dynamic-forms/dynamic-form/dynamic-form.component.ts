import { Class } from "@agape/types";
import { Component, Input, EventEmitter, Output, HostBinding } from "@angular/core";
import { DynamicFormGroup } from "../dynamic-form-group";
import { DynamicFormChangesEvent } from "../dynamic-form-interfaces";
import { Model, ModelDescriptor } from "@agape/model";


@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

    @Input('class') userClass: string

    @HostBinding('class') get class() {
        let classes: string[] = ['dynamic-form']
        if ( this.modelDescriptor ) classes.push(this.modelDescriptor.token)
        if ( this.userClass ) classes.push(this.userClass)
        return classes.join(' ')
    }

    @Input() group: DynamicFormGroup

    @Input() fieldOrder: string|string[]

    @Output() changes: EventEmitter<DynamicFormChangesEvent> = new EventEmitter()

    @Output() ngModelChanges: EventEmitter<DynamicFormChangesEvent> = new EventEmitter()

    token: string

    modelDescriptor: ModelDescriptor

    fieldNames: string[] = []

    ngOnChanges() {
        if ( this.group ) {
            const model = this.group.model
            this.modelDescriptor = Model.descriptor(model)
            this.parseFieldOrder()
        }
        else {
            this.modelDescriptor = undefined
            this.fieldNames = []
        }
    }

    private parseFieldOrder() {
        let fieldNames: string[]
        if ( Array.isArray(this.fieldOrder) ) {
            fieldNames = [...this.fieldOrder]
        }
        else if ( this.fieldOrder ) {
            fieldNames = this.fieldOrder.split(',').map( fieldName => fieldName.trim() )
        }
        else {
            fieldNames = this.modelDescriptor.fields.all().map( field => field.name )
        }

        for ( let fieldName of fieldNames ) {
            if ( ! this.modelDescriptor.fields.has(fieldName) ) {
                throw new Error(`$fieldName is not a field of ${this.group.model.name}`)
            }
        }

        for ( let field of this.modelDescriptor.fields.all() ) {
            if ( ! fieldNames.includes(field.name) ) {
                throw new Error(`Field ${field.name} missing from fieldOrder`)
            }
        }
        this.fieldNames = fieldNames
    }

    emitChange( fieldName: string, event: any ) {
        const fieldValue = this.group.ngFormGroup.value[fieldName]

        const changesEvent: DynamicFormChangesEvent = {
            event,
            changes: {
                [fieldName]: fieldValue
            }
        }
        
        this.changes.emit(changesEvent)
    }

    emitNgModelChange( fieldName: string, event: any ) {
        const fieldValue = this.group.ngFormGroup.value[fieldName]

        const changesEvent: DynamicFormChangesEvent = {
            event,
            changes: {
                [fieldName]: fieldValue
            }
        }
        
        this.ngModelChanges.emit(changesEvent)
    }
}