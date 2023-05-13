import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { UsersIndexPageComponent } from "./users-index-page/users-index-page.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { EditUserPageComponent } from "./edit-user-page/edit-user-page.component";


@NgModule({
    declarations: [
        UsersIndexPageComponent,
        EditUserPageComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
        MatTableModule,

    ],
    exports: [
        UsersIndexPageComponent
    ]
})
export class UsersModule {

}