
import clear from 'clear';
const { Select } = require('enquirer');
import chalk from 'chalk';
import figlet from 'figlet';

export interface MenuChoice {
    label: string;
    controller?: ( ...args:any[] ) => Promise<any>;
    controllerParams?: any[];
    view?: ( ...args:any[] ) => Promise<void>;
    params?: any;
}

export interface CliComponent {
    run(): Promise<void>|void
}


export class CliApplicationHeaderComponent {
    constructor( public text: string ) { }
    
    run() {
        console.log(this.text);
    }
}

export class CliBannerComponent {
    constructor( public text: string, public color:string='yellowBright' ) {

    }

    async run() {
        const bannerText = figlet.textSync( this.text, { font: 'Standard' } )
        const chalkMethod = chalk[this.color]
        console.log( chalkMethod.call(undefined, bannerText) )
    }
}

export class Cli {

    applicationHeader: CliApplicationHeaderComponent

    components: CliComponent[] = []


    header( text: string ) {
        const component = new CliApplicationHeaderComponent(text)
        this.applicationHeader = component
        return this
    }

    banner( text: string ) {
        const component = new CliBannerComponent( text )
        this.components.push( component )
        return this
    }

    async run() {
        let response = this.applicationHeader.run()

        if ( (response as any) instanceof Promise ) {
            await response
        }

        for ( let component of this.components ) {
            let response = component.run()
            if ( response instanceof Promise ) {
                await response
            }
        }
    }


    async menu( title: string, choices: MenuChoice[], clearScreen?: boolean ) {
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
}



export class ClearCommand {
    async run() {
        return clear()
    }
}

export const cli = new Cli()
export default cli

