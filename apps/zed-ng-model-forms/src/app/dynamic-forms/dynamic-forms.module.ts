import { NgModule } from "@angular/core";
import { DynamicFormFieldComponent } from "./dynamic-form-field/dynamic-form-field.component";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio"
import { MatSelectModule } from "@angular/material/select";
import { ChooseQuantityComponent } from "./choose-quantity-component/choose-quantity.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxGroupModule } from "./modules/mat-checkbox-group/mat-checkbox-group.module";



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
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatIconModule,

        /* custom form controls */
        MatCheckboxGroupModule,
    ]
})
export class DynammicFormsModule { }