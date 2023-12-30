import dotenv from 'dotenv';
const config = dotenv.config({ path: 'apps/_env/.env'})

import cors from 'cors';
import express, { Application } from 'express';
import { log } from '@lib/express';
import router from './app/app.routes'
import { connectOrm } from './orm';

const port = process.env.PORT ? Number(process.env.PORT) : 3011;
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

/* 404 */
app.use('*', (req, res) => {
  res.send('404 Page not found')
})

async function main() {

  await connectOrm()

  console.log("Connected to database at mongodb://localhost:27017")
  
  app.listen(port, () => {
    console.log(`Zed Server ORM started at http://localhost:${port}`);
  });
  
}
 
main()

  