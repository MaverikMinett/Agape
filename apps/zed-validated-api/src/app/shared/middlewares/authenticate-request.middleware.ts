import { ApiRequest, ApiResponse, Middleware, NextFunction, Injectable, JwtService } from "@agape/api";
import { Exception } from "@agape/exception";
import { Authentication } from "../models/auth/authentication.model";

@Injectable()
export class AuthenticateRequestMiddleware implements Middleware {
    constructor( private jwtService: JwtService ) {

    }

    async activate( request: ApiRequest<Authentication>, response: ApiResponse, next: NextFunction ) {
        const JWT_SECRET = process.env['JWT_SECRET']
        const token = this.extractTokenFromHeader(request)

        if ( token ) {
            try {
                const payload: Authentication = this.jwtService.verify( token, JWT_SECRET )
                request.auth = payload 
            }
            catch (error) {
                console.log(error)
                throw new Exception(401)
            }
        }

        await next()
    }

    private extractTokenFromHeader(request: ApiRequest) {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [ ]
        return type === 'Bearer' ? token : undefined
    }
}