import { ApiRequest, ApiResponse, Middleware, NextFunction, Injectable } from "@agape/api";

@Injectable()
export class LoggingMiddleware implements Middleware {

    async activate( request: ApiRequest, response: ApiResponse, next: NextFunction ) {
        let log: string = ''
        const startTime = new Date()
        const timestamp = startTime.toISOString()
        log += timestamp
        log += "  "
        log += request.method
        log += "  "
        log += response.statusCode
        log += "  "
        log += request.path
        const endTime = new Date()
        const diff = endTime.getTime() - startTime.getTime() 
        log += "  "
        log += diff + 'ms'
        console.log(log)
        await next()
    }

}