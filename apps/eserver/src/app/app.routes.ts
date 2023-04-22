import express, { Router } from 'express';

import { ping } from './ping.controller'

const router = Router()

router.use('/', express.static('./apps/_swagger') )

router.get('/ping', ( req, res ) => res.send( ping() ) )

export default router