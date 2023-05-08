import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { Environment } from "./environment.service";
import { ENVIRONMENT } from "./environment.token";

@NgModule({})
export class EnvironmentModule { 

    /* Only allow importing into the root AppModule */
    constructor( @Optional() @SkipSelf() parentModule: EnvironmentModule=null ) {
      if (parentModule) {
        throw new Error('EnvironmentModule is already loaded. It should only be imported in the application\'s main module.');
      }
    }

  /**
   * Allow configuring of the module with parameters passed to the forRoot() method.
   *
   * The environment service uses values provided here. This allows services and 
   * components that exist in shared libraries access to environment variables.
   *
   * @param   options Configuration options for the AgapeMdoule
   * @return  NgModule parameters
   */
  //@dynamic
  static forRoot( environment:any ): ModuleWithProviders<EnvironmentModule> {

    return {
      ngModule: EnvironmentModule,
      providers: [ 
       { provide: ENVIRONMENT, useValue: environment },
       Environment,
      ]
    }
  }

}