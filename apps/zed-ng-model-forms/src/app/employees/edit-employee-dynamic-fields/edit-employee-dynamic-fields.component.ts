import { Component, OnInit } from "@angular/core";
import { Employee, EmployeeEditView, EmployeeStatus } from "../../../shared/models/employee";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { Facility } from "apps/zed-ng-model-forms/src/shared/models/facility";
import { Class } from "@agape/types";
import { Choice } from "@agape/model";



function enumToOptions( set: any ) {
    const options = Object.entries(set).map( ([key, value]) => {
        const label = labelize(key)
        return { label, value }
    })
    return options
}

function documentsToChoices<T>( set: T[], transformer: (item: T) => Choice<T> ): Choice<T>[] {
    return set.map( item =>  ({ ...transformer(item), item } ) )
}

@Component({
    selector: 'app-edit-employee-dynamic-fields',
    templateUrl: 'edit-employee-dynamic-fields.component.html',
    styleUrls: ['edit-employee-dynamic-fields.component.scss']
}) 
export class EditEmployeeDynamicFieldsComponent implements OnInit {
    
    model = EmployeeEditView

    statusOptions = enumToOptions( EmployeeStatus )

    facilities: Facility[] = []

    facilityChoices: Choice<Facility>[] = []

    form = new FormBuilder().group({
        firstName: [null],
        lastName: [null],
        birthdate: [null],
        facility: [null],
        status: [null],
        notes: [null],
    })

    isSubmitted: boolean = false


    constructor( private facilityService: FacilityService ) {
        
    }

    ngOnInit() {
        this.facilityService.listFacilities().subscribe({
            next: facilities => {
                this.facilities = facilities
                this.facilityChoices = documentsToChoices(
                    facilities, 
                    facility => ({ value: facility.id, label: facility.label})
                )
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
