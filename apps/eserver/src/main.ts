import express from 'express';
import { log, proxy } from '@lib/express';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const verbose = true;

const app = express();

/* logging */
if ( verbose ) app.use( log )

/* redirect to angular app */
app.use(['/', '/*'], proxy('http://localhost:4200') )

/* 404 */
app.use('*', (req, res) => {
  res.send('404 Page not found')
})

app.listen(port, () => {
  console.log(`Express (with libs) started at http://localhost:${port}`);
});
