import express, { Router } from 'express';
import { bootstrapExpress } from '@agape/api';
import { ApiModule } from './api/api.module';


const router = Router()

router.use('/', express.static('./apps/_swagger') )

router.get('/ping', ( req, res ) => res.send( { message: 'pong' } ) )

bootstrapExpress(router, ApiModule)

export default router