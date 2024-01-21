import { NgModule } from "@angular/core";
import { DynamicFormFieldComponent } from "./dynamic-form-field/dynamic-form-field.component";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";



@NgModule({
    declarations: [
        DynamicFormFieldComponent
    ],
    exports: [
        DynamicFormFieldComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class DynammicFormsModule { }