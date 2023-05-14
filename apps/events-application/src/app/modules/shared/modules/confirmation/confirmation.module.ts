import { NgModule } from "@angular/core";
import { ConfirmationDialog } from "./confirmation.dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { ConfirmationService } from "./confirmation.service";


@NgModule({
    declarations: [ 
        ConfirmationDialog
    ], 
    imports: [ 
        CommonModule,
        MatDialogModule,
    ],
    exports: [
        ConfirmationDialog
    ],
    providers: [
        ConfirmationService
    ]
})
export class ConfirmationModule {

}