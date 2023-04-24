
import { listEvents, createEvent, retrieveEvent, updateEvent, deleteEvent } from './events.repo'

export async function getEvents() {
    return await listEvents()
}

export async function getEvent({ id }) {
    return await retrieveEvent(id)
}

export async function newEvent({payload}) {
    return await createEvent(payload)
}

export async function modifyEvent({id, payload}) {
    return await updateEvent(id, payload)
}

export async function removeEvent({ id }) {
    return await deleteEvent(id)
}
