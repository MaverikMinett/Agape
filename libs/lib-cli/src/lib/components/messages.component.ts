import chalk from 'chalk';


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
    info: "blue",
    warning: "orange",
    alert: "red"
}

export class CliMessagesComponent {
    async run( messages: CliMessage[] ) {
        for (let message of messages ) {
            const color = messageColors[message.type] || 'blue'
            const chalkMethod = chalk[color]
            console.log( chalkMethod.call(undefined, message.text) )
        }
    }
}