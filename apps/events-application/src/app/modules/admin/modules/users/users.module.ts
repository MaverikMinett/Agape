import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { UsersIndexPageComponent } from "./users-index-page/users-index-page.component";


@NgModule({
    declarations: [
        UsersIndexPageComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule,
    ],
    exports: [
        UsersIndexPageComponent
    ]
})
export class UsersModule {

}