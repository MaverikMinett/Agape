import { events, Event} from './model';
import { deleteEvent, saveEvent } from './controllers';

import { cli } from '@lib/cli';
import fb from '@lib/forms'
import { navigateToView } from '../router';

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
    /* choices */
    const choices = events.map( event =>  { 
        return { 
            label: event.name,
            view: eventsItemView,
            params: { item: event },
        } 
    })

    cli.banner('Events List')
    cli.message(input?.message)
    cli.menu("Events List", [
        { label: "< back", view: eventsIndex, indicator: "❰" },
        ...choices
    ])
    await cli.run(true)
    cli.finish()
}

/**
 * Event item view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsItemView( params?: { item: Event }, input?: any ) {
    const { item } = params

    cli.banner('event')
    cli.message(input?.message)
    cli.display(" " + item.name + "\n")
    cli.navmenu(" ", [
        { label: "< back", view: eventsListView },
        { label: "Edit event", view: eventsEditView, params: { item } },
        { label: "Buy tickets", view: eventsEditView, params: { item } },
        { 
            label: "Delete event",
            view: eventsListView,
            controller: deleteEvent,
            controllerParams: [ item.id ]
        }
    ])
    await cli.run(true)
    cli.finish()
}

/**
 * Event edit view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsEditView( params?: { item: Event } ) {
    let { item } = params ?? {}
    item ?? ( item = { name: '' } )

    const form = fb.string('name').string('description').value(item)

    cli.banner( item?.id ? 'Edit Event' : 'Create Event' )
    cli.form( form )
    cli.navmenu(" ", [
        { 
            label: "Save event", 
            controller: saveEvent, 
            controllerParams: [{ ...item, ...form.value()}],
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
