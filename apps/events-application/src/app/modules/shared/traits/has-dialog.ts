import { stack } from "@agape/object"
import { Class } from "@agape/types"
import { Injector } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

export class HasDialog {

    injector: Injector

    dialog: MatDialog

    @stack build() {
        this.dialog = this.injector.get(MatDialog)
    }

    openDialog( dialog: Class ) {
        const ref = this.dialog.open(dialog, {
            panelClass: 'reactive'
        })
        
        return ref
    }
}