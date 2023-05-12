import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { OrganizationsIndexPageComponent } from "./organizations-index-page/organizations-index-page.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        OrganizationsIndexPageComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
    ],
    exports: [
        OrganizationsIndexPageComponent
    ]

})
export class OrganizationsModule {

}