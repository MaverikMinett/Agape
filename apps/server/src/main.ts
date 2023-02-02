import * as http from 'http';
import { log, proxy } from '@lib/server';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const verbose = true;

const server = http.createServer()

server.on('request', async ( request, response ) => {

    /* logging */
    if ( verbose ) {
        response.on('finish', () => log( request, response ) )
    }

    /* redirect to angular app */
    let match: RegExpMatchArray = request.url.match(/^\/(?<path>.*)$/)
    if ( match ) {
        proxy('http://localhost:4200', match.groups.path, request, response )
        return;
    }
    else {
        response.write('404 Page not found')
        response.end()
    }

} )

server.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)


