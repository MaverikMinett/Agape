import { BehaviorSubject } from "rxjs";
import { Environment } from "../shared/environment/environment.service";
import { Injectable } from "@angular/core";

export interface ApiDefinition {
    name: string;
    url: string;
}

@Injectable({providedIn: 'root'})
export class ApiSelectorService {

    private subject: BehaviorSubject<ApiDefinition>

    constructor( private environment: Environment ) {
        const index = localStorage.getItem('selectedApi') 
            ? Number(localStorage.getItem('selectedApi'))
            : 0

        const selected = environment.get('apis')[index]
        this.subject = new BehaviorSubject<ApiDefinition>(selected)
    }

    select( api: ApiDefinition ) {
        this.subject.next(api)
        const index = this.environment.get('apis').indexOf(api)
        localStorage.setItem('selectedApi', index)
    }

    selected( ) {
        return this.subject.asObservable()
    }

}