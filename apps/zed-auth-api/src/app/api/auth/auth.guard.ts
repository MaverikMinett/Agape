import { Exception } from "@agape/exception";
import { ApiRequest, ApiResponse, Injectable, JwtService, Middleware, NextFunction } from "@agape/api";

import process from 'process';





@Injectable()
export class AuthGuard implements Middleware {
    constructor( private jwtService: JwtService ) {

    }

    async activate( request: ApiRequest, response: ApiResponse, next: NextFunction ) {
        const JWT_SECRET = process.env['JWT_SECRET']
        const token = this.extractTokenFromHeader(request)
        if ( ! token ) {
            throw new Exception(401)
        }
        try {
            const payload = this.jwtService.verify( token, JWT_SECRET )
            request['auth'] = payload 
        }
        catch (error) {
            console.log(error)
            throw new Exception(401)
        }
        console.log("Logged in")
        await next()
    }

    private extractTokenFromHeader(request: ApiRequest) {
        console.log("Headers", request.headers)
        const [type, token] = request.headers['authorization']?.split(' ') ?? [ ]
        return type === 'Bearer' ? token : undefined
       
    }
}