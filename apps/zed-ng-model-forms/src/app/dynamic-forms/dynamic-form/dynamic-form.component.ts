import { Class } from "@agape/types";
import { Component, Input } from "@angular/core";
import { DynamicFormGroup } from "../dynamic-form-group";


@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
    @Input() group: DynamicFormGroup

    ngOnInit() {
        console.log(this.group)
    }

}