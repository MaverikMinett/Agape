import { NgModule } from "@angular/core";
import { CheckboxPageComponent } from "./checkbox-page/checkbox-page.component";
import { Route, RouterModule } from "@angular/router";
import { CheckboxExample001 } from "./examples/checkbox-example-001.component";
import { CommonModule } from "@angular/common";
import { DynammicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { CheckboxExample002 } from "./examples/checkbox-example-002.component";
import { MatCheckboxGroupPageComponent } from "./mat-checkbox-group-page/mat-checkbox-group-page.component";
import { MatCheckboxGroupExample001 } from "./mat-checkbox-group-examples/mat-checkbox-group-example-001.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxGroupModule } from "../../../dynamic-forms/modules/mat-checkbox-group/mat-checkbox-group.module";
import { CheckboxExample003 } from "./examples/checkbox-example-003.component";
import { CheckboxExample004 } from "./examples/checkbox-example-004.component";

const routes: Route[] = [
    { path: 'playground/checkboxes', component: CheckboxPageComponent },
    { path: 'playground/checkboxes/mat-checkbox-group', component: MatCheckboxGroupPageComponent }
]

@NgModule({
    declarations: [
        CheckboxPageComponent,
        MatCheckboxGroupPageComponent,
        CheckboxExample001,
        CheckboxExample002,
        CheckboxExample003,
        CheckboxExample004,
        MatCheckboxGroupExample001,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynammicFormsModule,
        ReactiveFormsModule,
        MatCheckboxGroupModule
    ],
    
})
export class CheckboxModule {

}