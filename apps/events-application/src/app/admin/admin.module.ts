import { NgModule } from "@angular/core";
import { AdminIndexPageComponent } from "./components/admin-index-page/admin-index-page.component";
import { CommonModule } from "@angular/common";
import { Route, RouterModule } from "@angular/router";
import { AdminSidenavComponent } from "./components/admin-sidenav/admin-sidenav.component";

const routes: Route[] = [
    { path: 'admin', component: AdminIndexPageComponent }
]

@NgModule({
    declarations: [ 
        AdminIndexPageComponent,
        AdminSidenavComponent
     ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }