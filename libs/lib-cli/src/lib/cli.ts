
import { FormGroup } from '@lib/forms';
import clear from 'clear';
import { AnyKeyToContinueComponent } from './components/any-key-to-continue.component';
import { CliBannerComponent } from './components/banner.component';
import { CliDisplayComponent } from './components/display.component';
import { EnterToContinueComponent } from './components/enter-to-continue.component';
import { CliFormComponent } from './components/form.component';
import { CliHeaderComponent } from './components/header.component';
import { CliMenuComponent, CliMenuChoice } from './components/menu.component';
import { CliMessage, CliMessagesComponent } from './components/messages.component';

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

    anyKeyToContinue() {
        const component = new AnyKeyToContinueComponent()
        this.components.push(component)
        return this
    }

    enterToContinue() {
        const component = new EnterToContinueComponent( )
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
        if ( this.applicationHeader ) await this.applicationHeader.run()

        if ( this.applicationBanner ) await this.applicationBanner.run()

        if ( this.applicationMessages ) await this.applicationMessages.run(this.messages)

        for ( let component of this.components ) {
            await component.run()
        }

        this.finish()
    }

}

export const cli = new Cli()
export default cli

