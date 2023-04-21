
import { Router } from 'express';
import { getEvent, getEvents } from './events.controller';

export const eventsRouter = Router()

eventsRouter.get( '/events', async ( request, response ) => {
    const events = await getEvents()
    response.send(events)
})

eventsRouter.get( '/events/:id', async ( request, response ) => {
    const id = request.params.id
    const events = await getEvent({id})
    response.send(events)
})

export default eventsRouter