import clear from 'clear';
const { Select } = require('enquirer');
import inquirer from 'inquirer';


import { banner } from '../shared';
import { menu } from '../../lib/menu';
import { events, Event} from './model';
import { deleteEvent, saveEvent } from './controllers';

import cli from '../../lib/cli';

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
    await cli.run()
    cli.finish()
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


interface InquirerQuestion {
    type: 'input';
    name: string;
    message: string;
    default?: any;
}

/**
 * Event edit view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsEditView( params?: { item: Event } ) {
    let { item } = params ?? {}
    item ?? ( item = { name: '' } )

    banner( item?.id ? 'Edit Event' : 'Create Event' )

    /* display */
    clear()

    banner( item?.id ? 'Edit Event' : 'Create Event' ) 

    const questions: InquirerQuestion[] = []
    const question: InquirerQuestion = {
        'type': 'input',
        'name': 'name',
        'message': 'Name',
    }
    if ( item.name !== undefined ) question.default = item.name
    questions.push(question)

    const answers = await inquirer.prompt(questions)

    await menu(" ", [
        { 
            label: "Save event", 
            controller: saveEvent, 
            controllerParams: [{ ...item, ...answers}],
            view: eventsListView
         },
        { 
            label: "< back", 
            view: eventsListView 
        },
    ])
}
