import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { OrganizationsIndexPageComponent } from "./organizations-index-page/organizations-index-page.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { EditOrganizationPageComponent } from "./edit-organization-page/edit-organization-page.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        OrganizationsIndexPageComponent,
        EditOrganizationPageComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatInputModule,
        MatSnackBarModule,
        RouterModule,
    ],
    exports: [
        OrganizationsIndexPageComponent
    ]

})
export class OrganizationsModule {

}