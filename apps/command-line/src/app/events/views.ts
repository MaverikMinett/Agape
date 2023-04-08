import clear from 'clear';
const { Select } = require('enquirer');


import { banner } from '../shared';

import { events } from './model';


export function eventsIndex() {

    /* choices */
    const choices = [
        { label: "View events", view: eventsListView },
        { label: "Create event", view: eventsEditView }
    ]

    /* prompt */
    const prompt = new Select({
        name: 'Events Menu',
        message: " ",
        choices: choices.map( choice => choice.label )
    })

    /* display */
    clear()

    banner( 'Events' )   

    prompt.run()
        .then( 
            ( answer: string ) => {
                const view = choices.find( choice => choice.label === answer )?.view
                if ( ! view ) eventsIndex()
                else view()
            }
        )
        .catch( 
            console.error 
        );
}

function eventsListView() {
  
    /* choices */
    const choices = events.map( event => { return { value: event.name } } )
    choices.unshift( { value: '< back' } )

    /* prompt */
    const prompt = new Select({
        name: 'Events List',
        message: " ",
        choices: choices.map( choice => choice.value )
    })

    /* display */
    clear()

    banner( 'Events List' )   

    prompt.run()
        .then( 
            ( answer: string ) => {
                console.log( answer )
                if ( answer === '< back' ) eventsIndex()
            }
        )
        .catch( 
            console.error 
        );  
}

function eventsEditView( params?: { item: Event } ) {
    /* display */
    clear()

    banner( 'Create Item' ) 
    
    console.log(' Not implmented' )
}