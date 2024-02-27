import { NgModule } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { DecimalMaskDirective } from "./decimal-mask.directive";

@NgModule({
    declarations: [
        DecimalMaskDirective
    ],
    exports: [
        DecimalMaskDirective
    ],
    providers: [
        DecimalPipe
    ]
})
export class DecimalMaskModule { }