import clear from 'clear';
import chalk from 'chalk';
const { Select } = require('enquirer');
import inquirer from 'inquirer';


import { banner } from '../shared';
import { menu } from '../../lib/menu';
import { events, Event} from './model';
import { saveEvent } from './controllers';


/**
 * Display the events menu
 */
export async function eventsIndex() {
    /* display */
    clear()

    banner( 'Events' )   

    /* menu */
    await menu("Events Menu", 
        [
            { label: "View events", view: eventsListView },
            { label: "Create event", view: eventsEditView },
        ]
    )
}                           

/**
 * Events list view
 */
async function eventsListView(params: any, input: any ) {
    /* display */
    clear()

    banner( 'Events List' )   

    if ( input?.message ) {
        console.log( chalk.blue(input?.message) + "\n" )
    } 

    /* choices */
    const choices = events.map( event =>  { 
            return { 
                params: { item: event },
                label: event.name
            } 
        } 
    )

    /* menu */
    const response = await menu("Events List", 
        [
            { label: "< back", view: eventsIndex },
            ...choices
        ]
    )
    if ( ! response.view ) {
        const { item } = response.params
        await eventsItemView({ item })
    }
}

/**
 * Event item view
 * @param params View parameters
 * @param params.item The event to display
 */
async function eventsItemView( params?: { item: Event } ) {
    const { item } = params

    /* display */
    clear()

    banner( 'Event' )
    
    console.log( " " + item.name + "\n" )

    /* menu */
    menu(" ", [
        { label: "< back", view: eventsListView },
        { label: "Edit event", view: eventsEditView, params: { item } },
    ])
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

