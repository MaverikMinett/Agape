import { stack } from "@agape/object";
import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";


export class HasHttpClient {

    injector: Injector

    http: HttpClient

    @stack build() {
        this.http = this.injector.get(HttpClient)
    }

}