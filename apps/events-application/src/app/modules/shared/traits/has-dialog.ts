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

    public openDialog( dialog: Class, data:any={}, options:any={} ) {
		
		'panelClass' in options 
			? options['panelClass'] = 'reactive ' + options['panelClass']
			: options['panelClass'] = 'reactive'


		options['data'] = data

        const ref = this.dialog.open(dialog, options)

        console.log(ref, options)
        

        return ref
	}

}