import { NgModule } from "@angular/core";
import { EventsIndexPageComponent } from "./events-index-page/events-index-page.component";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";


@NgModule({
    declarations: [
        EventsIndexPageComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule
    ],
    exports: [
        EventsIndexPageComponent,
    ]
})
export class EventsModule {

}