import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { Facility, FacilityStatus } from "apps/zed-ng-model-forms/src/shared/models/facility";
import { Class } from "@agape/types";


function enumToOptions( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    console.log( options )
    return options
}

@Component({
    selector: 'app-edit-facility-dynamic',
    templateUrl: 'edit-facility-dynamic.component.html',
    styleUrls: ['edit-facility-dynamic.component.scss']
}) 
export class EditFacilityDynamicComponent {

    model: Class = Facility
    
    statusOptions = enumToOptions( FacilityStatus )

    form = new FormBuilder().group({
        label: [null, Validators.required],
        stations: [null, Validators.required],
        status: [null, Validators.required],
    })

    anyValue: any = 42

    isSubmitted: boolean = false


    constructor( private facilityService: FacilityService ) {
        
    }

    ngOnInit() {
        console.log("------>", this.model)
    }


    submit() {
        this.isSubmitted = true
        this.form.markAsPristine()
    }
}
