import { NgModule } from "@angular/core";
import { DynamicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { Route, RouterModule } from "@angular/router";
import { DatePageComponent } from "./date-page/date-page.component";
import { DateExample001 } from "./examples/date-example-001.component";
import { CommonModule } from "@angular/common";

const routes: Route[] = [
    {
        path: 'playground/date',
        component: DatePageComponent
    }
]

@NgModule({
    declarations: [
        DatePageComponent,
        DateExample001
    ],
    imports: [
        CommonModule,
        DynamicFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class DateModule { }