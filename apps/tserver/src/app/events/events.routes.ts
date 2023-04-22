
import { Router } from 'express';
import { getEvent, getEvents, modifyEvent, newEvent, removeEvent } from './events.controller';
import { IEvent } from './event.interface'
import { OptionalId } from '../../types';

import Joi  from 'joi'
import { returnResponse } from '../../lib/response-helper';

export const eventsRouter = Router()


eventsRouter.get( '/events', 
    returnResponse( async () => {
        const events = await getEvents()
        return events
    })
)

const createEventValidationSchema = Joi.object({
    name: Joi.string().required()
})

eventsRouter.post( '/events', 
    returnResponse(async ({ request, response }) => {
        const payload: OptionalId<IEvent,string> = request.body

        const { error } = createEventValidationSchema.validate(payload)
        if ( error ) throw error

        const result = await newEvent({payload})
        response.status(201)
        return result
    })
)


eventsRouter.delete( '/events/:id', 
    returnResponse( async ({request, response}) => {
        const id = request.params.id
        await removeEvent({id})
        response.status(204)
    })
)

const updateEventValidationSchema = Joi.object({
    name: Joi.string().required()
})

eventsRouter.put( '/events/:id', 
    returnResponse( async ({request}) => {

        const id = request.params.id
        const payload: IEvent = request.body

        const { error } = updateEventValidationSchema.validate(payload)
        if ( error ) throw error

        await modifyEvent({id, payload})
    }) 
)

eventsRouter.get( '/events/:id',
    returnResponse( async ({request}) => {
        const id = request.params.id
        const event = await getEvent({id})
        return event
    } )
)

export default eventsRouter