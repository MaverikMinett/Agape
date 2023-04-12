const { Select } = require('enquirer');

export interface CliMenuChoice {
    label: string;
    controller?: ( ...args:any[] ) => Promise<any>;
    controllerParams?: any[];
    view?: ( ...args:any[] ) => Promise<void>;
    params?: any;
}


export class CliMenuComponent {
    
    constructor( public title: string, public choices: CliMenuChoice[] ) {

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
    
        const answer: CliMenuChoice = await prompt.run()
    
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