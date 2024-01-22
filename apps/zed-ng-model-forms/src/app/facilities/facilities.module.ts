import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button";
import { FacilitiesIndexComponent } from "./facilities-index/facilities-index.component";
import { EditFacilityReactiveComponent } from "./edit-facility-reactive/edit-facility-reactive.component";
import { EditFacilityDynamicFieldsComponent } from "./edit-facility-dynamic-fields/edit-facility-dynamic-fields.component";
import { DynammicFormsModule } from "../dynamic-forms/dynamic-forms.module";
import { EditFacilityDynamicFormComponent } from "./edit-facility-dynamic-form/edit-facility-dynamic-form.component";

const routes: Route[] = [
    {
        path: 'facilities',
        component: FacilitiesIndexComponent
    },
    {
        path: 'facilities/edit-reactive',
        component: EditFacilityReactiveComponent
    },
    {
        path: 'facilities/edit-dynamic-fields',
        component: EditFacilityDynamicFieldsComponent
    },
    {
        path: 'facilities/edit-dynamic-form',
        component: EditFacilityDynamicFormComponent
    }
]

@NgModule({
    declarations: [
        FacilitiesIndexComponent,
        EditFacilityReactiveComponent,
        EditFacilityDynamicFieldsComponent,
        EditFacilityDynamicFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        DynammicFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule
    ]
})

export class FacilitiesModule { }