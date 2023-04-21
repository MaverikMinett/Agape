import express, { Router } from 'express';

import { ping } from './ping.controller'

import eventsRouter from './events/events.routes'

const router = Router()

router.use('/', express.static('./apps/_swagger') )

router.get('/ping', ( req, res ) => res.send( ping() ) )

router.use(eventsRouter)

export default router