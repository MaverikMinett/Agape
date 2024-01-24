import { Component, OnInit } from "@angular/core";
import { Employee, EmployeeEditView, EmployeeStatus } from "../../../shared/models/employee";
import { FormBuilder, Validators } from "@angular/forms";
import { labelize } from "@agape/string";
import { FacilityService } from "apps/zed-ng-model-forms/src/shared/services/facility.service";
import { Facility } from "apps/zed-ng-model-forms/src/shared/models/facility";
import { Class } from "@agape/types";
import { Choice } from "@agape/model";
import { DynamicFormGroup } from "../../dynamic-forms/dynamic-form-group";



@Component({
    selector: 'app-edit-employee-dynamic-form',
    templateUrl: 'edit-employee-dynamic-form.component.html',
    styleUrls: ['edit-employee-dynamic-form.component.scss']
}) 
export class EditEmployeeDynamicFormComponent implements OnInit {
    
    form = new DynamicFormGroup(EmployeeEditView)

    constructor( private facilityService: FacilityService ) {
        
    }

    ngOnInit() {

        // this.form.configure({
        //     fields: {
        //         'facility': {
        //             choicesResolver: this.facilityService.listFacilities()
        //         }
        //     }
        // })
    }


    submit() {
        this.form.markAsPristine()
    }
}
