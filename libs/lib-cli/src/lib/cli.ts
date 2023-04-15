
import { FormGroup } from '@lib/forms';
import clear from 'clear';
import { AnyKeyToContinueComponent } from './components/any-key-to-continue.component';
import { CliBannerComponent } from './components/banner.component';
import { CliDisplayComponent } from './components/display.component';
import { EnterToContinueComponent } from './components/enter-to-continue.component';
import { CliFormComponent } from './components/form.component';
import { CliHeaderComponent } from './components/header.component';
import { CliNavMenuComponent, CliNavMenuChoice } from './components/navmenu.component';
import { CliMessage, CliMessagesComponent } from './components/messages.component';
import { CliMenuItem } from './controls/menu.control';
import { CliMenuComponent } from './components/menu.component';

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

    /**
     * Accepts a component class to instantiate and add to the cli document
     * @param component Component constructor function
     * @returns 
     */
    // component<T extends { new(...args: any[]): any; }>( component: T, ...args: any[] ): this {
    //     const instance = new component(...args)
    //     this.components.push(instance)
    //     return this
    // }

    component<T>( instance: T ) {
        this.components.push(instance)
    }

    display( )
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

    menu<T extends CliMenuItem>( name: string, choices: T[] ) {
        const component = new CliMenuComponent(name, choices)
        this.components.push( component )
        return this
    }

    navmenu( title: string, choices: CliNavMenuChoice[] ) {
        const component = new CliNavMenuComponent(title, choices)
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


    async run( clearScreen: boolean = false) {

        const stash: any = { }

        if ( clearScreen ) clear()

        if ( this.applicationHeader ) await this.applicationHeader.run()

        if ( this.applicationBanner ) await this.applicationBanner.run()

        if ( this.applicationMessages ) await this.applicationMessages.run(this.messages)

        for ( let component of this.components ) {
            const response = await component.run()
            if ( response ) this.mergeComponentResponseWithStash( stash, response )
        }

        this.finish()

        return stash
    }

    protected mergeComponentResponseWithStash( stash: any, response: any ) {
        for ( let key of Object.keys(response) ) {
            if ( !(key in stash) ) stash[key] = { }
            Object.assign(stash[key], response[key])
        }
        
    }

}

export const cli = new Cli()
export default cli

