import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { EmployeesIndexComponent } from "./employees-index/employee-index.component";
import { EditEmployeeReactiveComponent } from "./edit-employee-reactive/edit-employee-reactive.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button";
import { EditEmployeeDynamicFieldsComponent } from "./edit-employee-dynamic-fields/edit-employee-dynamic-fields.component";
import { DynamicFormsModule } from "../dynamic-forms/dynamic-forms.module";
import { EditEmployeeDynamicFormComponent } from "./edit-employee-dynamic-form/edit-employee-dynamic-form.component";

const routes: Route[] = [
    {
        path: 'employees',
        component: EmployeesIndexComponent
    },
    {
        path: 'employees/edit-reactive',
        component: EditEmployeeReactiveComponent
    },
    {
        path: 'employees/edit-dynamic-fields',
        component: EditEmployeeDynamicFieldsComponent
    },
    {
        path: 'employees/edit-dynamic-form',
        component: EditEmployeeDynamicFormComponent
    }
]

@NgModule({
    declarations: [
        EmployeesIndexComponent,
        EditEmployeeReactiveComponent,
        EditEmployeeDynamicFieldsComponent,
        EditEmployeeDynamicFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        DynamicFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class EmployeesModule { }