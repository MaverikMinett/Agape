
import http from 'http'

export function log( request: http.IncomingMessage, response: http.ServerResponse ) {
    const { method, url } = request;
    const { statusCode, statusMessage } = response;
    console.log(`${statusCode} ${method} ${url}`)
    if ( statusCode >= 400 ) console.log(`    ${statusMessage}`)
}


