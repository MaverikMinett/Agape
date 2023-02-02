import express from 'express';
import { proxy } from '@lib/express';

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

app.use(['/', '/*'], proxy('http://localhost:4200') )

app.use('*', (req, res) => {
  console.log("base", req.baseUrl)
  console.log("url", req.url)
  res.send('404 Page not found')
})

app.listen(port, () => {
  console.log(`Express (with libs) started at http://localhost:${port}`);
});
