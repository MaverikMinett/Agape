import { Component, Injector } from "@angular/core";
import { AComponent } from "./acomponent";
import { MatDialogRef } from "@angular/material/dialog";
import { NewEventDialog } from "../admin/modules/events/new-event-dialog/new-event-dialog.component";


@Component({template: '' })
export class ADialog extends AComponent {

    protected dialog: MatDialogRef<NewEventDialog>

    build() {
        this.dialog  = this.injector.get(MatDialogRef)
    }

    close( return_value=null ) {
		this.dialog.close( return_value )
	}

    notify( action=null, item=null ) {
		let response = { 'action': action }
		this.close( response )
	}
}