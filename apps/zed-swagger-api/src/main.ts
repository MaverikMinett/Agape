import dotenv from 'dotenv';
const config = dotenv.config({ path: 'apps/_env/.env'})


import cors from 'cors';
import express, { Application, Router } from 'express';
import { log, proxy } from '@lib/express';
import { connect } from './db';
import router from './app/app.routes'
import { connectOrm } from './orm';





const port = process.env.PORT ? Number(process.env.PORT) : 3009;
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


async function main() {

    await connect()

    await connectOrm()
  
    console.log("Connected to database at mongodb://localhost:27017")
    
    app.listen(port, () => {
      console.log(`Zed Server ORM started at http://localhost:${port}`);
    });
    
  }
  
 
  main()

  