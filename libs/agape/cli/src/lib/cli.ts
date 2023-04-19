
import { FormGroup } from '@lib/forms';
import clear from 'clear';
import { AnyKeyToContinueComponent } from './components/any-key-to-continue.component';
import { CliBannerComponent, CliBannerFormatFunction } from './components/banner.component';
import { CliDisplayComponent } from './components/display.component';
import { EnterToContinueComponent } from './components/enter-to-continue.component';
import { CliFormComponent } from './components/form.component';
import { CliHeaderComponent } from './components/header.component';
import { CliMessage, CliMessagesComponent } from './components/messages.component';
import { CliMenuItem } from './controls/menu.control';
import { CliMenuComponent } from './components/menu.component';
import { Menu } from '@lib/menu'

export interface CliComponent {
    run(): Promise<void>|void
}





export class Cli {

    applicationHeader: CliHeaderComponent

    applicationBanner: CliBannerComponent

    applicationMessages: CliMessagesComponent = new CliMessagesComponent()

    components: any[] = []

    messages: CliMessage[] = []

    private bannerFormatter: CliBannerFormatFunction

    header( text: string ) {
        const component = new CliHeaderComponent(text)
        this.applicationHeader = component
        return this
    }

    banner( text: string ) {  
        if ( text === undefined || text === null )
            this.applicationBanner = undefined
        else {
            const component = new CliBannerComponent( text, this.bannerFormatter )
            this.applicationBanner = component
        }
        return this
    }

    bannerFormat( formatter: CliBannerFormatFunction )  {
        this.bannerFormatter = formatter
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

    form( form: FormGroup ): this
    form( name: string, form: FormGroup ): this
    form( ...args: any[]) {
        let form: FormGroup
        let name: string

        if ( args.length === 1 ) {
            form = args[0]
            name = " "
        }
        else {
            [ name, form ] = args
        }

        const component = new CliFormComponent(name, form)
        this.components.push(component)
        return this
    }

    menu( menu: Menu ): this 
    menu( name: string, menu: Menu ): this
    menu( ...args: any[] ) {
        let menu: Menu
        let name: string

        if ( args.length === 1 ) {
            menu = args[0]
            name = " "
        }
        else {
            [ name, menu ] = args
        }

        const component = new CliMenuComponent(name, menu)
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

