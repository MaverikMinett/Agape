import { Component } from "@angular/core";
import { Environment } from "../../../shared/environment/environment.service";
import { ApiDefinition, ApiSelectorService } from "../api-selector.service";




@Component({
    selector: 'app-api-selector',
    templateUrl: './api-selector.component.html',
    styleUrls: ['./api-selector.component.scss']
})
export class ApiSelectorComponent {

    apis: ApiDefinition[] = []

    selected: ApiDefinition

    constructor( 
        private env: Environment,
        private apiSelector: ApiSelectorService
    ) {

        this.apiSelector.selected().subscribe(
            (api) => {
                this.selected = api
            }
        )
    }

    ngOnInit() {
        this.apiSelector
        this.apis = this.env.get('apis')
    }

    onControlChange( event: any ) {
        this.apiSelector.select(this.selected)
    }
    

}