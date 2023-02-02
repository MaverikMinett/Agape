import http from 'http';
import pathlib from 'path';

import { URL } from 'url';
import { Request, Response, NextFunction } from 'express'

export function proxy( to: string ) {
    const { hostname, pathname, port } = new URL(to)

    return function proxy( request: Request, response: Response, next: NextFunction ) {

        const path = pathlib.join(pathname,request.url.slice(1))

        const options =  {
            hostname,
            port,
            path,
            method: request.method,
            headers: request.headers
        };

        const proxy = http.request( options, result => {
            response.writeHead(result.statusCode as number, result.headers)
            result.pipe( response, { end: true })
        } )

        request.pipe( proxy, { end: true } )
    }
}

/*

## Synopsis

```

const app = express()
app.use( ['/','/*'], proxy('http://localhost:4200') )
```

 */