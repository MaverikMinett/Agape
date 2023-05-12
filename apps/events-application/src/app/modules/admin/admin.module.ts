import { NgModule } from "@angular/core";
import { AdminIndexPageComponent } from "./components/admin-index-page/admin-index-page.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminSidenavComponent } from "./components/admin-sidenav/admin-sidenav.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { EventsModule } from "./modules/events/events.module";
import { adminRoutes } from "./admin.routes";

import { MatTableModule } from '@angular/material/table'





@NgModule({
    declarations: [ 
        AdminIndexPageComponent,
        AdminDashboardComponent,
        AdminSidenavComponent
     ],
    imports: [
        CommonModule,
        EventsModule,
        RouterModule.forChild(adminRoutes),
    ]
})
export class AdminModule { }