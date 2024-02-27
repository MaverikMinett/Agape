import { NgModule } from "@angular/core";
import { DynamicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { NumberPageComponent } from "./number-page/number-page.component";
import { Route, RouterModule } from "@angular/router";
import { NumberExample001 } from "./examples/number-example-001";
import { CommonModule } from "@angular/common";
import { NumberExample002 } from "./examples/number-example-002";
import { NumberExample003 } from "./examples/number-example-003";
import { DecimalMaskDirectivePage } from "./decimal-mask-directive-page/decimal-mask-directive-page.component";
import { DecimalMaskExample001 } from "./decimal-mask-examples/decimal-mask-example-001";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DecimalMaskModule } from "../../../dynamic-forms/modules/decimal-mask/decimal-mask.module";
import { DecimalMaskExample002 } from "./decimal-mask-examples/decimal-mask-example-002";


const routes: Route[] = [
    {
        path: 'playground/number',
        component: NumberPageComponent
    },
    {
        path: 'playground/number/decimal-mask',
        component: DecimalMaskDirectivePage
    }
]

@NgModule({
    declarations: [
        NumberPageComponent,
        DecimalMaskDirectivePage,
        NumberExample001,
        NumberExample002,
        NumberExample003,
        DecimalMaskExample001,
        DecimalMaskExample002
    ],
    imports: [
        CommonModule,
        DynamicFormsModule,
        ReactiveFormsModule,
        FormsModule,
        DecimalMaskModule,
        RouterModule.forChild(routes)
    ],
})
export class NumberModule { }