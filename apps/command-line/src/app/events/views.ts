import { events, Event} from './model';
import { deleteEvent, saveEvent } from './controllers';

import { cli } from '@lib/cli';
import fb from '@lib/forms'

/**
 * Display the events menu
 */
export async function eventsIndex() {
    cli.banner('Events')
    cli.menu("Events Menu", 
        [
            { label: "View events", view: eventsListView },
            { label: "Create event", view: eventsEditView },
        ]
    )
    await cli.run(true)
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
        { label: "< back", view: eventsIndex },
        ...choices
    ])
    await cli.run()
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
    cli.menu(" ", [
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
    await cli.run()
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
    cli.menu(" ", [
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
    await cli.run()
    cli.finish()
}
