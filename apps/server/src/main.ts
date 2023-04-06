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
    }
    else {
        response.write('404 Page not found')
        response.end()
    }

} )

server.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)


