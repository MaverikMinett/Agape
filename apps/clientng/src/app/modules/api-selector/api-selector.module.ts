import { NgModule } from "@angular/core";
import { ApiSelectorService } from "./api-selector.service";
import { ApiSelectorComponent } from "./api-selector/api-selector.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";



@NgModule({
    declarations: [ ApiSelectorComponent ],
    providers: [ ApiSelectorService ],
    exports: [ ApiSelectorComponent ],
    imports: [ CommonModule, FormsModule ]
})
export class ApiSelectorModule{ }