import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { EmployeesIndexComponent } from "./employees-index/employee-index.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button";

const routes: Route[] = [
    {
        path: 'employees',
        component: EmployeesIndexComponent
    },
    {
        path: 'employees/edit',
        component: EditEmployeeComponent
    }
]

@NgModule({
    declarations: [
        EmployeesIndexComponent,
        EditEmployeeComponent
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
export class EmployeesModule { }