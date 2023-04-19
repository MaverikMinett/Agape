
export type CliMessageType = 'alert'|'info'|'warning'

export class CliMessage {
    type: CliMessageType = 'info'
    text: string;

    constructor( text: string )
    constructor( type: CliMessageType, text: string )
    constructor( ...args: any[] ) {
        if ( args.length === 1 ) {
            const [ text ] = args
            this.text = text
        }  
        else {
            const [ type, text ] = args
            this.type = type
            this.text = text 
        }
    }
}


export const messageColors = {
    info: "\x1b[38;5;27m",
    warning: "\x1b[38;2;229;187;0m",
    alert: "\x1b[38;2;192;54;101m"
}

export class CliMessagesComponent {
    async run( messages: CliMessage[] ) {
        if ( messages.length ) {
            for (let message of messages ) {
                const color = messageColors[message.type];
                const reset = "\x1b[0m"
                console.log( color + message.text + reset )
            }
            console.log("")
        }
    }
}