
import { listEvents, retrieveEvent } from './events.repo'

export async function getEvents() {
    return await listEvents()
}

export async function getEvent({ id }) {
    return await retrieveEvent(id)
}