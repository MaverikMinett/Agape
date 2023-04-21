import express from 'express';
import { log, proxy } from '@lib/express'

import router from './app/app.routes'
import { connect } from './db'

const port = process.env.PORT ? Number(process.env.PORT) : 3002;
const verbose = true;

const app = express();

/* logging */
if ( verbose ) app.use( log )

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

async function main() {

  await connect()

  console.log("Connected to database at mongodb://localhost:27017")
  
  app.listen(port, () => {
    console.log(`Express (without libs) started at http://localhost:${port}`);
  });
  
}


main()
