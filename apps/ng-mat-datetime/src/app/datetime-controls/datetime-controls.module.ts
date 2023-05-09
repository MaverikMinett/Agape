import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Route, RouterModule } from "@angular/router";
import { DateControlWithReactiveFormComponent } from "./date-control-with-reactive-form/date-control-with-reactive-form.component";
import { DateControlWithTemplateFormComponent } from "./date-control-with-template-form/date-control-with-template-form.component";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { MatNativeDateModule} from '@angular/material/core';


import { AgMatDatetimeControlModule } from '@agape/ng-mat-datetime-control'

export const routes: Route[] = [
    { path: 'datetime-control-with-reactive-form', component: DateControlWithReactiveFormComponent },
    { path: 'datetime-control-with-template-form', component: DateControlWithTemplateFormComponent }
]

@NgModule({
    declarations: [
        DateControlWithReactiveFormComponent, 
        DateControlWithTemplateFormComponent, 
    ],
    providers: [

    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        AgMatDatetimeControlModule,
    ]
})
export class DatetimeControlsModule {

}