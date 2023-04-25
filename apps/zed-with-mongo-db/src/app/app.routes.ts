import express, { Router } from 'express';
import { bootstrap } from '@agape/api';
import { ApiModule } from './api/api.module';


const router = Router()

router.use('/', express.static('./apps/_swagger') )

router.get('/ping', ( req, res ) => res.send( { message: 'pong' } ) )

bootstrap(router, ApiModule)

export default router