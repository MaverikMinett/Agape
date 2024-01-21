import { Component, OnInit } from "@angular/core";
import { Employee, EmployeeStatus } from "../../../shared/models/employee";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { Facility } from "apps/zed-ng-model-forms/src/shared/models/facility";


function enumToOptions( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    console.log( options )
    return options
}

@Component({
    selector: 'app-edit-employee',
    templateUrl: 'edit-employee.component.html',
    styleUrls: ['edit-employee.component.scss']
}) 
export class EditEmployeeComponent implements OnInit {
    
    model = Employee

    statusOptions = enumToOptions( EmployeeStatus )

    facilities: Facility[] = []

    form = new FormBuilder().group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        birthdate: [null],
        facility: [null, Validators.required],
        status: [null, Validators.required],
        notes: [null],
    })

    isSubmitted: boolean = false


    constructor( private facilityService: FacilityService ) {
        
    }

    ngOnInit() {
        this.facilityService.listFacilities().subscribe({
            next: facilities => {
                this.facilities = facilities
            },
            error: error => {
                console.log(error)
            }
        })
    }


    submit() {
        this.isSubmitted = true
        this.form.markAsPristine()
    }
}
