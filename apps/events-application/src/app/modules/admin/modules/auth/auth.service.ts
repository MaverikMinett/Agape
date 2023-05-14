import { Injectable } from "@angular/core";
import { ICredentials } from "./interfaces/credentials.interface";
import { AService } from "../../../shared/aservice";
import { Traits } from "../../../shared/traits";
import { HasHttpClient } from "../../../shared/traits/has-http-client";

export interface AuthService extends HasHttpClient { };

@Injectable({ providedIn: 'root' })
@Traits( HasHttpClient )
export class AuthService extends AService {

    apiRoot: string = "http://localhost:3007/api"


    login( credentials: ICredentials ) {
        return this.http.post(`${this.apiRoot}/auth/login`, credentials)
    }

}