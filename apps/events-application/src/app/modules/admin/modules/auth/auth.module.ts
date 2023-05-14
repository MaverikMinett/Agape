import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { authRoutes } from "./auth.routes";

@NgModule({
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        RouterModule.forChild(authRoutes),
    ]

})
export class AuthModule {

}