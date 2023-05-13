import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { OrganizationsIndexPageComponent } from "./organizations-index-page/organizations-index-page.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { EditOrganizationPageComponent } from "./edit-organization-page/edit-organization-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NewOrganizationDialog } from "./new-organization-dialog/new-organization-dialog.component";


@NgModule({
    declarations: [
        OrganizationsIndexPageComponent,
        EditOrganizationPageComponent,
        NewOrganizationDialog,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
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