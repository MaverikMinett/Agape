import { ApiRequest, ApiResponse, Middleware, NextFunction, Injectable } from "@agape/api";
import { Exception } from "@agape/exception";

@Injectable()
export class AdminAuthGuard implements Middleware {

    async activate( request: ApiRequest, response: ApiResponse, next: NextFunction ) {

        if ( ! request.auth ) {
            throw new Exception(401)
        }

        if ( ! request.auth.isAdmin ) {
            throw new Exception(403)
        }

        await next()
    }

}