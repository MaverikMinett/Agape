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
    }
]

@NgModule({
    declarations: [
        SelectBoxPageComponent,
        SelectBoxPageReactiveComponent,
        SelectBoxPageDynamicComponent,
        SelectBoxExample001,
        SelectBoxExample002,
        SelectBoxExample003,
        SelectBoxExample004,
        SelectBoxExample005,
        SelectBoxExample006
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynammicFormsModule,
        ReactiveFormsModule
    ]
})
export class SelectBoxModule { }