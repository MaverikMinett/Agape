
import { Router } from 'express';
import { getEvent, getEvents, newEvent } from './events.controller';
import { IEvent } from './event.interface'

export const eventsRouter = Router()

eventsRouter.get( '/events', async ( request, response ) => {
    const events = await getEvents()
    response.send(events)
})

eventsRouter.post( '/events', async ( request, response ) => {
    const payload: Omit<IEvent, 'id'> = request.body
    const result = await newEvent({payload})
    response.send(result)
})

eventsRouter.get( '/events/:id', async ( request, response ) => {
    const id = request.params.id
    const events = await getEvent({id})
    response.send(events)
})

export default eventsRouter