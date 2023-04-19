import { events, Event} from './model';
import { deleteEvent, saveEvent } from './controllers';

import { cli, clip } from '@lib/cli';
import fb from '@lib/forms'
import { executeController, navigateToView } from '../router';



/**
 * Display the events menu
 */
export async function eventsIndex() {
    cli
    .banner('Events')
    .menu("Events Menu", 
        [
            { label: "View events", view: eventsListView },
            { label: "Create event", view: eventsEditView },
        ]
    )
    const response = await cli.run(true)

    const view = response['menu']['Events Menu'].view
    await navigateToView(view)
}                           

/**
 * Events list view
 */
async function eventsListView(params: any, input: { message: string } ) {
    clip.banner('Events List')
    clip.message(input?.message)
    clip.menu("Events List", [
        { label: "back", indicator: "❰", back: true },
        ...events.map( event =>  {  return { event, label: event.name } })
    ])

    const response = await clip.run(true)

    if ( response['menu'].back === true ) 
        return navigateToView(eventsIndex)

    const event = response['menu'].event
    console.log(event)
    navigateToView(eventsItemView, {id: event.id})
}

/**
 * Event item view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsItemView( params?: { id: string }, input?: any ) {
    const { id } = params

    const event = events.find( e => e.id === id )

    cli.banner('Event')
    cli.message(input?.message)
    cli.display(event.name)
    cli.menu('action', [
        { label: "back", indicator: "❰", back: true },
        { label: "Edit event", action: "edit-event" },
        { label: "Buy tickets", action: "buy-tickets" },
        { label: "Delete event", action: "delete-event" }
    ])

    const response = await cli.run(true)

    if ( response['menu'].back ) return navigateToView(eventsListView)

    const action = response['menu'].action
    if ( action === 'edit-event' ) {
        return navigateToView(eventsEditView, { id: event.id})
    }

    else if ( action === 'delete-event' ) {
        executeController(deleteEvent, event.id )
    }
}

/**
 * Event edit view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsEditView( params?: { item: Event } ) {
    let { item } = params ?? {}
    item ?? ( item = { name: '' } )

    const form = fb.string('name').string('description').setValue(item)

    cli.banner( item?.id ? 'Edit Event' : 'Create Event' )
    cli.form( form )
    cli.navmenu(" ", [
        { 
            label: "Save event", 
            controller: saveEvent, 
            controllerParams: [{ ...item, ...form.value}],
            view: eventsListView
         },
        { 
            label: "< back", 
            view: eventsListView 
        },
    ])
    await cli.run(true)
    cli.finish()
}
