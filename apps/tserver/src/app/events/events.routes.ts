
import { Router } from 'express';

export const eventsRouter = Router()

eventsRouter.get( '/events', ( request, response ) =>
    response.send( "Hello world!" ) 
)

export default eventsRouter