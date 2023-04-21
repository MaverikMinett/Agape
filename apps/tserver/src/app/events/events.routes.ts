
import { Router } from 'express';
import { getEvent, getEvents, modifyEvent, newEvent, removeEvent } from './events.controller';
import { IEvent } from './event.interface'
import { OptionalId } from '../../types';

export const eventsRouter = Router()



eventsRouter.get( '/events', async ( request, response ) => {
    const events = await getEvents()
    response.send(events)
})


eventsRouter.post( '/events', async ( request, response ) => {
    const payload: OptionalId<IEvent,string> = request.body
    const result = await newEvent({payload})
    response.status(201).send(result)
})


eventsRouter.delete( '/events/:id', async ( request, response ) => {
    const id = request.params.id
    await removeEvent({id})
    response.status(204).send(undefined)
})


eventsRouter.put( '/events/:id', async ( request, response ) => {
    const id = request.params.id
    const payload: IEvent = request.body
    await modifyEvent({id, payload})
    response.send(undefined)
})


eventsRouter.get( '/events/:id', async ( request, response ) => {
    const id = request.params.id
    const events = await getEvent({id})
    response.send(events)
})



export default eventsRouter