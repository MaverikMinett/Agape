import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Facility } from "apps/zed-ng-model-forms/src/shared/models/facility";
import { Class } from "@agape/types";


@Component({
    selector: 'app-edit-facility-dynamic',
    templateUrl: 'edit-facility-dynamic-fields.component.html',
    styleUrls: ['edit-facility-dynamic-fields.component.scss']
}) 
export class EditFacilityDynamicFieldsComponent {

    model: Class = Facility

    changes: string[] = []

    form = new FormBuilder().group({
        label: ["testing"],
        stations: [null],
        status: [null],
    })


    valueChanged( event: any, fieldName: string, onChange: string, via: string ) {
        this.changes.push(`${fieldName} changed ${onChange} ${via}: ${this.form.value[fieldName]}` )
    }

    submit() {
        this.form.markAsPristine()
    }
}
