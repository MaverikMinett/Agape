import { Component } from "@angular/core";
import { AComponent } from "../../acomponent";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADialog } from "../../adialog";

export interface ConfirmationDialogData {
    message: string;
    okButtonText: string;
    okButtonStyle: string;
    cancelButtonText: string;
}


@Component({
    selector: 'zed-confirmation-dialog',
    templateUrl: 'confirmation.dialog.html',
    styleUrls: ['./confirmation.dialog.scss']
})
export class ConfirmationDialog extends ADialog {
    
    options: ConfirmationDialogData = this.injector.get(MAT_DIALOG_DATA)


}