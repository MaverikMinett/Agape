import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { Facility, FacilityEditView, FacilityStatus } from "apps/zed-ng-model-forms/src/shared/models/facility";
import { Class } from "@agape/types";
import { DynamicFormGroup } from "../../dynamic-forms/dynamic-form-group";


function enumToOptions( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    console.log( options )
    return options
}

@Component({
    selector: 'app-edit-facility-dynamic-form',
    templateUrl: 'edit-facility-dynamic-form.component.html',
    styleUrls: ['edit-facility-dynamic-form.component.scss']
}) 
export class EditFacilityDynamicFormComponent {

    changes: string[] = []
    

    form = new DynamicFormGroup(FacilityEditView)


    constructor( private facilityService: FacilityService ) {
        
    }


    // valueChanged( event: any, fieldName: string, onChange: string, via: string ) {
    //     this.changes.push(`${fieldName} changed ${onChange} ${via}: ${this.form.value[fieldName]}` )
    // }

    submit() {
        // this.form.markAsPristine()
    }
}