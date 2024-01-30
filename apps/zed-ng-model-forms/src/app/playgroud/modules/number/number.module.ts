import { NgModule } from "@angular/core";
import { DynamicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { NumberPageComponent } from "./number-page/number-page.component";
import { Route, RouterModule } from "@angular/router";
import { NumberExample001 } from "./examples/number-example-001";
import { CommonModule } from "@angular/common";
import { NumberExample002 } from "./examples/number-example-002";


const routes: Route[] = [
    {
        path: 'playground/number',
        component: NumberPageComponent
    }
]

@NgModule({
    declarations: [
        NumberPageComponent,
        NumberExample001,
        NumberExample002
    ],
    imports: [
        CommonModule,
        DynamicFormsModule,
        RouterModule.forChild(routes)
    ],
})
export class NumberModule { }