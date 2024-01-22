import { Class } from "@agape/types";
import { Component, Input, EventEmitter, Output } from "@angular/core";
import { DynamicFormGroup } from "../dynamic-form-group";
import { DynamicFormChangesEvent } from "../dynamic-form-interfaces";


@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
    @Input() group: DynamicFormGroup

    @Output() changes: EventEmitter<DynamicFormChangesEvent> = new EventEmitter()

    @Output() ngModelChanges: EventEmitter<DynamicFormChangesEvent> = new EventEmitter()


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