import { BehaviorSubject } from "rxjs";
import { Environment } from "../../shared/environment/environment.service";
import { Injectable } from "@angular/core";

export interface ApiDefinition {
    name: string;
    url: string;
}

@Injectable({providedIn: 'root'})
export class ApiSelectorService {

    private subject: BehaviorSubject<ApiDefinition>

    constructor( public environment: Environment ) {
        const defaultApi = environment.get('apis')[0]
        this.subject = new BehaviorSubject<ApiDefinition>(defaultApi)
    }

    select( api: ApiDefinition ) {
        this.subject.next(api)
    }

    selected( ) {
        return this.subject.asObservable()
    }

}