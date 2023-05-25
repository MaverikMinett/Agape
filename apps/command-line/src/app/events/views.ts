import { events, Event} from './model';
import { deleteEvent, saveEvent } from './controllers';

import { cli } from '@agape/cli';
import fb from '@agape/forms'
import { Menu } from '@agape/menu'
import { executeControllerAndNavigate, navigateToView } from '../router';

/**
 * Display the events menu
 */
export async function eventsIndex() {
    const menu = new Menu()
    .item('View events', () => navigateToView(eventsListView) )
    .item('Create event', () => navigateToView(eventsEditView) )

    cli
    .banner('Events')
    .menu(menu)
    await cli.run(true)
    await menu.execute()
}                           

/**
 * Events list view
 */
async function eventsListView(params: any, input: { message: string } ) {
    /* menu */
    const menu = new Menu()
    .item('back', () => navigateToView(eventsIndex), { indicator: "❰" } )

    for ( let event of events ) {
        menu.item(event.name, () => navigateToView(eventsItemView, {id: event.id}) )
    }

    /* cli */
    cli.banner('Events List')
    cli.message(input?.message)
    cli.menu(menu)

    await cli.run(true)
    await menu.execute()
}

/**
 * Event item view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsItemView( params?: { id: string }, input?: any ) {
    const { id } = params

    const event = events.find( e => e.id === id )

    const menu = new Menu()
    .item('back', () => navigateToView(eventsListView), { indicator: "❰" } )
    .item('Edit event', () => navigateToView(eventsEditView, { id: event.id}) )
    .item('Delete event', () => executeControllerAndNavigate(deleteEvent, [event.id], eventsListView ) )

    cli.banner('Event')
    cli.message(input?.message)
    cli.display(event.name)
    cli.menu(menu)

    await cli.run(true)
    await menu.execute()
}

/**
 * Event edit view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsEditView( params?: { id: string } ) {

    const id  = params?.id

    let item  = id 
        ? events.find( e => e.id === id ) 
        :  { name: '' }

    /* form */
    const form = fb.string('name').string('description').setValue(item)

    /* menu */
    const menu = new Menu()
    .item('Save event', () => {
        const editedEvent = {...item, ...form.value}
        executeControllerAndNavigate(saveEvent, [editedEvent], eventsListView )
    })
    .item('cancel', () => navigateToView(eventsListView), { indicator: "❰" } )

    /* cli */
    cli.banner( item?.id ? 'Edit Event' : 'Create Event' )
    cli.form( form )
    cli.menu( menu )

    await cli.run(true)
    await menu.execute()
}
