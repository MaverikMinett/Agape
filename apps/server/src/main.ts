import * as http from 'http';
import { log, proxy } from '@lib/server';
import fs from 'fs';
import { extname } from 'path';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const verbose = true;

const server = http.createServer()

server.on('request', async ( request, response ) => {

    /* logging */
    if ( verbose ) {
        response.on('finish', () => log( request, response ) )
    }

    /* display service index */
    if ( request.url.match(/^\/$/) ) {
        let indexHtml = fs.readFileSync('./apps/_common/index.html')
        response.write( indexHtml )
        response.end()
        return;
    }

    /** routing **/
    let match: RegExpMatchArray

    try {

        /* display swagger documentation */
        match = request.url.match(/^\/api\/?$/) || request.url.match(/^\/api\/(?<path>.*)$/)
        if ( match ) {
            const path = match.groups?.path ?? 'index.html'
            const suffix = match.groups?.path ? extname(path) : '';

            let content = fs.readFileSync(`./apps/_swagger/${path}`)
            console.log(response.getHeaders())
            response.write( content )
            response.end()
            return;
        }

        /* redirect to angular app */
        match = request.url.match(/^\/ng$/) ?? request.url.match(/^\/ng\/(?<path>.*)$/)
        if ( match ) {
            console.log(`Forwarding to angular frontend ${match.groups?.path}`)
            proxy('http://localhost:4200', match.groups?.path ?? "/", request, response )
            return;
        }

        /* redirect to project zed frontend */
        match = request.url.match(/^\/zed$/) ?? request.url.match(/^\/zed\/(?<path>.*)$/)
        if ( match ) {
            console.log(`Forwarding to project zed frontend http://localhost:4201${match.groups?.path}`)
            proxy('http://localhost:4201', match.groups?.path ?? "", request, response )
            return;
        }

        /* page not found error */
        response.write('404 Page not found')
        response.end()

    } catch (error) {
        console.log(error)
    }


} )

server.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)


