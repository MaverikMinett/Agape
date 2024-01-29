import { NgModule } from "@angular/core";
import { DynammicFormsModule } from "../../../dynamic-forms/dynamic-forms.module";
import { Route, RouterModule } from "@angular/router";
import { RadioPageComponent } from "./radio-page/radio-page.component";
import { RadioExample001 } from "./examples/radio-example-001.component";
import { CommonModule } from "@angular/common";
import { RadioExample002 } from "./examples/radio-example-002.component";


const routes: Route[] = [
    { 
        path: 'playground/radio',
        component: RadioPageComponent
    }
]

@NgModule({
    declarations: [
        RadioPageComponent,
        RadioExample001,
        RadioExample002
    ],
    imports: [
        CommonModule,
        DynammicFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class RadioModule{ }