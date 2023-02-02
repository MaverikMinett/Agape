import express from 'express';
import { proxy } from '@lib/server'

const port = process.env.PORT ? Number(process.env.PORT) : 3002;
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

app.get(['/','/*'], (req, res) => {
  console.log(req.params)
  proxy('http://localhost:4200', `/${req.params['0']}`, req, res )
});

app.listen(port, () => {
  console.log(`Express (without libs) started at http://localhost:${port}`);
});
