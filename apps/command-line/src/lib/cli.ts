
import { FormGroup } from '@lib/forms';
import clear from 'clear';
import { CliBannerComponent } from './cli/components/banner.component';
import { CliDisplayComponent } from './cli/components/display.component';
import { CliFormComponent } from './cli/components/form.component';
import { CliHeaderComponent } from './cli/components/header.component';
import { CliMenuComponent, CliMenuChoice } from './cli/components/menu.component';
import { CliMessage, CliMessagesComponent } from './cli/components/messages.component';

const { Select } = require('enquirer');


export interface CliComponent {
    run(): Promise<void>|void
}

export class Cli {

    applicationHeader: CliHeaderComponent

    applicationBanner: CliBannerComponent

    applicationMessages: CliMessagesComponent = new CliMessagesComponent()

    components: any[] = []

    messages: CliMessage[] = []

    header( text: string ) {
        const component = new CliHeaderComponent(text)
        this.applicationHeader = component
        return this
    }

    banner( text: string ) {
        const component = new CliBannerComponent( text )
        this.applicationBanner = component
        return this
    }

    display( text: string ): this
    display( ...text: any[] ): this {
        const component = new CliDisplayComponent( ...text )
        this.components.push(component)
        return this
    }

    form( form: FormGroup ) {
        const component = new CliFormComponent(form)
        this.components.push(component)
        return this
    }

    menu( title: string, choices: CliMenuChoice[] ) {
        const component = new CliMenuComponent(title, choices)
        this.components.push( component )
        return this
    }

    message( text: string ) {

        if ( text !== undefined) {
            const message = new CliMessage(text)
            this.messages.push(message)
        }

        return this
    }

    clearMessages() {
        this.messages = []
    }

    finish() {
        this.components = []
        this.clearMessages()
    }

    async run() {
        clear()

        /* header */
        this.awaitComponent(this.applicationHeader)

        /* banner */
        this.awaitComponent(this.applicationBanner)

        /* banner */
        this.awaitComponent(this.applicationMessages, this.messages)

        /* components */
        for ( let component of this.components ) {
            this.awaitComponent(component)
        }

        this.clearMessages()
    }

    protected async awaitComponent( component: any, ...args: any[] ) {
        let response = component.run(...args)
        if ( (response as any) instanceof Promise ) {
            await response
        }
        return response
    }

}



export class ClearCommand {
    async run() {
        return clear()
    }
}

export const cli = new Cli()
export default cli

