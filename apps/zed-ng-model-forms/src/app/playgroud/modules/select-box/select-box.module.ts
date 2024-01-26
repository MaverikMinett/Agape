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
import { SelectBoxExample005 } from "./examples/select-box-example-005.component";
import { SelectBoxPageReactiveComponent } from "./select-box-page-reactive/select-box-page-reactive.component";
import { SelectBoxPageDynamicComponent } from "./select-box-page-dynamic/select-box-page-dynamic.component";
import { SelectBoxExample006 } from "./examples/select-box-example-006.component";
import { SelectBoxExample007 } from "./examples/select-box-example-007.component";
import { SelectBoxExample008 } from "./examples/select-box-example-008.component";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { SelectBoxExample009 } from "./examples/select-box-example-009.component";
import { SelectBoxPageNonDynamicComponent } from "./select-box-page-non-dynamic/select-box-page-non-dynamic.component";
import { SelectBoxExample010 } from "./examples/select-box-example-010.componen";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
// import { SelectBoxExample010 } from "./examples/select-box-example-010.componen";

const routes: Route[] = [
    { 
        path: 'playground/select-box',
        component: SelectBoxPageComponent
    },
    { 
        path: 'playground/select-box/reactive',
        component: SelectBoxPageReactiveComponent
    },
    { 
        path: 'playground/select-box/dynamic',
        component: SelectBoxPageDynamicComponent
    },
    { 
        path: 'playground/select-box/non-dynamic',
        component: SelectBoxPageNonDynamicComponent
    }
]

@NgModule({
    declarations: [
        SelectBoxPageComponent,
        SelectBoxPageReactiveComponent,
        SelectBoxPageDynamicComponent,
        SelectBoxPageNonDynamicComponent,
        SelectBoxExample001,
        SelectBoxExample002,
        SelectBoxExample003,
        SelectBoxExample004,
        SelectBoxExample005,
        SelectBoxExample006,
        SelectBoxExample007,
        SelectBoxExample008,
        SelectBoxExample009,
        SelectBoxExample010,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynammicFormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule
    ]
})
export class SelectBoxModule { }