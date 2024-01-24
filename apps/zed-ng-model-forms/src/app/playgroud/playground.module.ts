import { NgModule } from "@angular/core";
import { SelectBoxModule } from "./modules/select-box/select-box.module";
import { Route, RouterModule } from "@angular/router";
import { PlaygroundIndexComponent } from "./components/playground-index/playground-index.component";

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
        RouterModule.forChild(routes)
    ]
})
export class PlaygroundModule { }