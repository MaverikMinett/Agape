
const { Select } = require('enquirer');

export interface MenuChoice {
    label: string;
    controller?: ( ...args:any[] ) => Promise<void>;
    view?: ( ...args:any[] ) => Promise<void>;
    params?: any;
}


export async function menu( title: string, choices: MenuChoice[] ) {
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

    const { view, controller, params } = answer
    if ( controller ) {
        if ( params ) await controller(...params)
        else await controller()
    }
    else if ( view ) await view(params)
    return answer
}