import { NgModule } from "@angular/core";
import { SelectBoxModule } from "./modules/select-box/select-box.module";
import { Route, RouterModule } from "@angular/router";
import { PlaygroundIndexComponent } from "./components/playground-index/playground-index.component";
import { CheckboxModule } from "./modules/checkbox/checkbox.module";

const routes: Route[] = [
    // {
    //     path: 'playground',
    //     component: PlaygroundIndexComponent
    // }
]

@NgModule({
    declarations: [
        PlaygroundIndexComponent
    ],
    imports: [
        SelectBoxModule,
        CheckboxModule,
        RouterModule.forChild(routes)
    ]
})
export class PlaygroundModule { }