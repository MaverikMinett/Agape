const { Select } = require('enquirer');

export interface CliNavMenuChoice {
    label: string;
    controller?: ( ...args:any[] ) => Promise<any>;
    controllerParams?: any[];
    view?: ( ...args:any[] ) => Promise<void>;
    params?: any;
}


export class CliNavMenuComponent {
    
    constructor( public title: string, public choices: CliNavMenuChoice[] ) {

    }

    async run() {
        const prompt = new Select({
            message: this.title,
            choices: this.choices.map( choice => {
                return {  
                    value: choice,
                    message: choice.label
                }
             } )
        })
    
        const answer: CliNavMenuChoice = await prompt.run()
    
        const { view, params, controller, controllerParams } = answer
        let controllerResponse: any
        /* execute the controller */
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