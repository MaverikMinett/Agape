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

const routes: Route[] = [
    {
        path: 'facilities',
        component: FacilitiesIndexComponent
    },
    {
        path: 'facilities/edit',
        component: EditFacilityReactiveComponent
    }
]

@NgModule({
    declarations: [
        FacilitiesIndexComponent,
        EditFacilityReactiveComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule
    ]
})

export class FacilitiesModule { }