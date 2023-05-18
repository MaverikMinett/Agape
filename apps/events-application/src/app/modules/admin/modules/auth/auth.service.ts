import { Injectable } from "@angular/core";
import { ICredentials } from "./interfaces/credentials.interface";
import { AService } from "../../../shared/aservice";
import { Traits } from "../../../shared/traits";
import { HasHttpClient } from "../../../shared/traits/has-http-client";
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, tap } from 'rxjs'

const TOKEN_KEY = 'token';

export interface LoginResponse {
    token: string;
}

export interface AuthService extends HasHttpClient { };

@Injectable({ providedIn: 'root' })
@Traits( HasHttpClient )
export class AuthService extends AService {

    apiRoot: string = "http://localhost:3007/api"

    token: string

    jwtHelper: JwtHelperService

    subject: BehaviorSubject<any>


    build() {
        this.jwtHelper = this.injector.get(JwtHelperService)
        this.subject = new BehaviorSubject(null)
        if ( this.isAuthenticated() ) {
            this.subject.next(true)
        }
    }

    authenticated() {
        return this.subject.asObservable()
    }


    login( credentials: ICredentials ) {
        return this.http.post<LoginResponse>(`${this.apiRoot}/auth/login`, credentials)
            .pipe( tap( response => this.onLogin(response) ) )
    }

    logout() {
        this.setToken('')
        this.subject.next(null)
    }

    onLogin( response: LoginResponse ) {
        this.setToken( response.token )
        this.subject.next(true)
    }

    setToken( token: string ) {
        this.token = token
        localStorage.setItem(TOKEN_KEY, token)
    }

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    }

    isAuthenticated() {
        const token = this.getToken()
        if ( ! token ) return false
        return ! this.jwtHelper.isTokenExpired(token)
    }



}