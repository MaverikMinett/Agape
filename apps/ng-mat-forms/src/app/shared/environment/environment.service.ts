import { Inject, Injectable } from "@angular/core";
import { ENVIRONMENT } from "./environment.token";



@Injectable({ providedIn: 'root'})
export class Environment {

  constructor( @Inject(ENVIRONMENT) private env: any ) {
    
  }

  get( key:string, defaultValue:any=undefined ) {
    return this.env.hasOwnProperty( key ) ? this.env[key] : defaultValue
  }
  
}