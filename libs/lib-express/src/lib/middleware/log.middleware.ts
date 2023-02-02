
import { Request, Response, NextFunction } from 'express'

export function log( request: Request, response: Response, next: NextFunction ) {

    response.on('finish', () => {
        const { method, url } = request;
        const { statusCode, statusMessage } = response;
        console.log(`${statusCode} ${method} ${url}`)
        if ( statusCode >= 400 ) console.log(`    ${statusMessage}`)
    })

    next()
}
