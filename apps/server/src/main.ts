import * as http from 'http';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

http.createServer( 
    ( request, response ) => {
        response.write('Hello world!')
        response.end()
    },
)
.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)
