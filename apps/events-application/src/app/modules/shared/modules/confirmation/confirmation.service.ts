import { Injectable } from "@angular/core";
import { Traits } from "../../traits";
import { HasDialog } from "../../traits/has-dialog";
import { AService } from "../../aservice";
import { ConfirmationDialog } from "./confirmation.dialog";

export interface ConfirmParams {
    okText?: string;
    okStyle?: ButtonStyle;
    cancelText?: string;
}

export type ButtonStyle = 'primary'|'primary-destructive'|'secondary'|'secondary-destructive'

export interface ConfirmationService extends HasDialog { }

@Injectable()
@Traits( HasDialog )
export class ConfirmationService extends AService {


    confirm( message: string, params?: ConfirmParams ) {
        const okButtonText = params?.okText ?? "Ok"
        const cancelButtonText = params?.cancelText ?? "Cancel"
        const okButtonStyle: ButtonStyle = params?.okStyle ?? 'primary'
    
        const ref = this.openDialog(ConfirmationDialog, 
            { message, okButtonText, okButtonStyle, cancelButtonText}
            )
    }

    confirmDelete( message: string, params?: ConfirmParams ) {
        const okButtonText = params?.okText ?? "Yes, delete"
        const cancelButtonText = params?.cancelText ?? "Cancel"
        const okButtonStyle: ButtonStyle = params?.okStyle ?? 'primary-destructive'
    
        const ref = this.openDialog(ConfirmationDialog, 
            { message, okButtonText, okButtonStyle, cancelButtonText}
            )
    }

}