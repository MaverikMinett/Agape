import { NgModule } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCheckboxGroupComponent } from "./mat-checkbox-group/mat-checkbox-group.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        MatCheckboxGroupComponent
    ],
    imports: [
        CommonModule,
        MatCheckboxModule,
    ],
    exports: [
        MatCheckboxGroupComponent
    ]
})
export class MatCheckboxGroupModule {

}