import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AService } from "../../../shared/aservice";
import { Injectable } from "@angular/core";
import { Traits } from "../../../shared/traits";
import { HasAuthService } from "./traits/has-auth-service.trait";
import { HasRouter } from "../../../shared/traits/has-router";
import { HasSnackbar } from "../../../shared/traits/has-snackbar";



export interface AuthorizedGuard extends
    HasAuthService,
    HasRouter,
    HasSnackbar
    { };

/**
 * This guard requires that a user be logged in to activate. Un-authorized users
 * will be redirected to the sign in page.
 *
 * guardMessage: str    Will be displayed to the user in a snackBar
 * guardRedirect: array User will be redirecto the the specified page  
 */
@Injectable()
@Traits( HasAuthService, HasRouter, HasSnackbar )
export class AuthorizedGuard extends AService implements CanActivate {


  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

    if ( ! this.auth.isAuthenticated() ) {

      let guardParams = route.data['guard'] || {}

      /* display a snackbar message. A default message is displayed, you can not display
      any message by passing in a null value for the message */
      let message  = 'message' in guardParams ? guardParams['message'] : "Please sign in";
      if ( message != null ) this.snackbarMessage(message, 5000)
      
      /* get the route user is attempting to navigate to and pass it
      in as the "next" parameter to the sign in page. */
      let targetRoute = state.url;

      /* redirect the user */
      let redirectTo = 'redirectTo' in guardParams ? route.data['redirectTo'] : 'admin/login'

      if ( redirectTo != null ) {
        this.router.navigate( [ redirectTo, { 'next': targetRoute } ] );
      }

      return false;
    }


    return true;
  }

}