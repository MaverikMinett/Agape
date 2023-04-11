import clear from 'clear';
import { events } from '../app/events/model';
const { Select } = require('enquirer');

export interface MenuChoice {
    label: string;
    controller?: ( ...args:any[] ) => Promise<any>;
    controllerParams?: any[];
    view?: ( ...args:any[] ) => Promise<void>;
    params?: any;
}


export async function menu( title: string, choices: MenuChoice[], clearScreen?: boolean ) {
    const prompt = new Select({
        message: title,
        choices: choices.map( choice => {
            return {  
                value: choice,
                message: choice.label
            }
         } )
    })

    const answer: MenuChoice = await prompt.run()
    if ( clearScreen ) clear()

    const { view, params, controller, controllerParams } = answer
    let controllerResponse: any
    if ( controller ) {
        if ( controllerParams ) { 
            controllerResponse = await controller(...controllerParams) 
        }
        else { 
            controllerResponse = await controller()
        }
    }
    if ( view ) await view(params, controllerResponse)
    return answer
}