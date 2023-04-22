import cors from 'cors';
import express, { Application, Router } from 'express';
import { log, proxy } from '@lib/express';

import router from './app/app.routes'

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const verbose = true;

const app: Application = express();

/* logging */
if ( verbose ) app.use( log )

/* json */
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

/* cors */
app.use( cors({origin: '*'}) )

/* application routes */
app.use('/api', router )



/* show common index.html */
app.use(express.static('./apps/_common') )

/* redirect to angular app */
app.use(['/ng', '/ng/*'], proxy('http://localhost:4200') )

/* redirect to project zed frontend */
app.use(['/zed', '/zed/*'], proxy('http://localhost:4201') )

/* 404 */
app.use('*', (req, res) => {
  res.send('404 Page not found')
})

// main(app)

app.listen(port, () => {
  console.log(`Express (with libs) started at http://localhost:${port}`);
});
