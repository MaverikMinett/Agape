import express from 'express';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const verbose = true;

const app = express();

/* logging */
if ( verbose ) {
  app.use( (req, res, next ) => {
    const { method, url } = req;
    const { statusCode, statusMessage } = res;
  
    res.on('finish', () => {
      console.log(`${statusCode} ${method} ${url}`)
      if ( statusMessage ) console.log(`        ${statusMessage}`)
    })
  
    next()
  })
}


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, () => {
  console.log(`Express (with libs) started at http://localhost:${port}`);
});
