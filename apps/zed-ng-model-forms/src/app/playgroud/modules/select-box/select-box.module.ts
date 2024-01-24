import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { SelectBoxPageComponent } from "./select-box-page/select-box-page.component";
import { SelectBoxExample001 } from "./examples/select-box-example-001.component";
import { DynammicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectBoxExample002 } from "./examples/select-box-example-002.component";
import { CommonModule } from "@angular/common";
import { SelectBoxExample003 } from "./examples/select-box-example-003.component";
import { SelectBoxExample004 } from "./examples/select-box-example-004.component";

const routes: Route[] = [
    { 
        path: 'playground/select-box',
        component: SelectBoxPageComponent
    }
]

@NgModule({
    declarations: [
        SelectBoxPageComponent,
        SelectBoxExample001,
        SelectBoxExample002,
        SelectBoxExample003,
        SelectBoxExample004
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynammicFormsModule,
        ReactiveFormsModule
    ]
})
export class SelectBoxModule { }