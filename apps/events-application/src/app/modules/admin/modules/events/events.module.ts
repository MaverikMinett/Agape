import { NgModule } from "@angular/core";
import { EventsIndexPageComponent } from "./events-index-page/events-index-page.component";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { EditEventPageComponent } from "./edit-event-page/edit-event-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { AgMatDatetimeControlModule } from "@agape/ng-mat-datetime-control";
import { NewEventDialog } from "./new-event-dialog/new-event-dialog.component";


@NgModule({
    declarations: [
        EventsIndexPageComponent,
        EditEventPageComponent,
        NewEventDialog,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgMatDatetimeControlModule,
        RouterModule,
        MatInputModule,
        MatTableModule,
    ],
    exports: [
        EventsIndexPageComponent,
    ]
})
export class EventsModule {

}