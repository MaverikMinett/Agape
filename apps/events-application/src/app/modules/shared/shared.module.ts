import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Route, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ModelService } from "./model.service";



@NgModule({
    declarations: [ 

     ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        ModelService
    ]
})
export class SharedModule { }