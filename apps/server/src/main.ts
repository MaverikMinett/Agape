import * as http from 'http';
import { log, proxy } from '@lib/server';
import * as fs from 'fs';

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

    /** redirects **/
    let match: RegExpMatchArray

    /* redirect to angular app */
    match = request.url.match(/^\/ng(?<path>.*\/?)$/)
    if ( match ) {
        console.log(`Forwarding to angular frontend ${match.groups.path}`)
        proxy('http://localhost:4200', match.groups.path ?? "", request, response )

        return;
    }

    match = request.url.match(/^\/zed(?<path>.*\/?)$/)
    if ( match ) {
        console.log(`Forwarding to agape frontend http://localhost:4201${match.groups.path}`)
        proxy('http://localhost:4201', match.groups.path ?? "", request, response )
        return;
    }

    /* page not found error */
    response.write('404 Page not found')
    response.end()
} )

server.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)


