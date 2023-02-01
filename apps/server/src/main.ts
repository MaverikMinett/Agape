import * as http from 'http';

const port = 3000;

http.createServer( 
    ( request, response ) => {
        response.write('Hello world!')
        response.end()
    },
)
.listen(
    port, () => console.log(`Server started at http://localhost:${port}`)
)
