import express, { Router } from 'express';
import { bootstrap } from '../lib/bootstrap-express';
import { FooModule } from './api/foo/foo.module';


const router = Router()

router.use('/', express.static('./apps/_swagger') )

// router.get('/ping', ( req, res ) => res.send( ping() ) )



bootstrap(router, FooModule)

export default router