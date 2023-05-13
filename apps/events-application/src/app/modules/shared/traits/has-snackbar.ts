import { stack } from "@agape/object";
import { Injector } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


export class HasSnackbar {

    injector: Injector

    snackbar: MatSnackBar

    @stack build() {
        this.snackbar = this.injector.get(MatSnackBar)
    }

    snackbarMessage(message: string, duration: 1500 ) {
        this.snackbar.open(message, undefined, { duration: duration })
    }

}