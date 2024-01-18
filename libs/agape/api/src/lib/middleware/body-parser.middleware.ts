import { ApiRequest, ApiResponse, Middleware, NextFunction, Injectable } from "@agape/api";

@Injectable()
export class BodyParserMiddleware implements Middleware {

    async activate( request: ApiRequest, response: ApiResponse, next: NextFunction ) {
        
        // console.log(request.body)

        await next()
    }

}