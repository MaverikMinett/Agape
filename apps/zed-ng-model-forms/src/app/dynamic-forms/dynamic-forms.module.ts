import { NgModule } from "@angular/core";
import { DynamicFormFieldComponent } from "./dynamic-form-field/dynamic-form-field.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ChooseQuantityComponent } from "./choose-quantity-component/choose-quantity.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";



@NgModule({
    declarations: [
        DynamicFormFieldComponent,
        ChooseQuantityComponent,
        DynamicFormComponent
    ],
    exports: [
        DynamicFormFieldComponent,
        DynamicFormComponent,
        ChooseQuantityComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class DynammicFormsModule { }