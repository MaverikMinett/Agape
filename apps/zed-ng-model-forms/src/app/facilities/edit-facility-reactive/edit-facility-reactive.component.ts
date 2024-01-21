import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { FacilityStatus } from "apps/zed-ng-model-forms/src/shared/models/facility";


function enumToOptions( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    console.log( options )
    return options
}

@Component({
    selector: 'app-edit-facility',
    templateUrl: 'edit-facility-reactive.component.html',
    styleUrls: ['edit-facility-reactive.component.scss']
}) 
export class EditFacilityReactiveComponent {
    
    statusOptions = enumToOptions( FacilityStatus )

    form = new FormBuilder().group({
        label: [null, Validators.required],
        status: [null, Validators.required],
    })

    isSubmitted: boolean = false


    constructor( private facilityService: FacilityService ) {
        
    }


    submit() {
        this.isSubmitted = true
        this.form.markAsPristine()
    }
}
