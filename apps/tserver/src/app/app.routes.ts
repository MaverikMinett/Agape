
import { Router } from 'express';

import { ping } from './ping.controller'

const router = Router()

router.get('/ping', ( req, res ) => res.send( ping() ) )

export default router