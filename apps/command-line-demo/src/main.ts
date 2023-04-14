
import { AnyKeyToContinueComponent, Cli, CliBannerComponent, CliInputControl, CliMenuControl, getCursorPosition, keypress } from '@lib/cli';
import chalk from 'chalk';

import  readline from 'readline';
import { NavmenuComponent } from './app/navmenu.component';



async function t001_keypress() {
    console.log("\nTEST 001\n")
    console.log("Press any key to continue")
    await keypress()
    console.log("Success")
}

async function t002_any_key_to_continue_component() {
    console.log("\nTEST 002\n")

    const component = new AnyKeyToContinueComponent()
    await component.run()
    console.log("Success")
    
    console.log("Press any key to continue")
    await keypress()
}

async function t003_multiple_any_key_to_continue_components() {
    console.log("\nTEST 003\nMultiple, consecutive any key to continue components")

    const component1 = new AnyKeyToContinueComponent()
    const component2 = new AnyKeyToContinueComponent()
    const components = [ component1, component2 ]
    for ( let c of components ) {
        await c.run()
    }
    // await component.run()
    console.log("Success")
    
    console.log("Press any key to continue")
    await keypress()
}

async function t004_banner_component() {
    console.log("\nTEST 004\nBanner component")

    const component = new CliBannerComponent('Banner')
    await component.run()
    console.log("Press any key to continue")
    await keypress()
}

async function t005_banner_and_any_key_to_continue_component() {
    console.log("\nTEST 005\nBanner component and Any Key to Continue component")

    const component1 = new CliBannerComponent('Banner')
    const component2 = new AnyKeyToContinueComponent()
    const components = [ component1, component2 ]
    for ( let c of components ) {
        await c.run()
    }
    
    console.log("Press any key to continue")
    await keypress()
}

async function t006_banner_and_multiple_any_key_to_continue_component() {
    console.log("\nTEST 006\nBanner component and multiple Any Key to Continue component")

    const component1 = new CliBannerComponent('Banner')
    const component2 = new AnyKeyToContinueComponent()
    const component3 = new AnyKeyToContinueComponent()
    const components = [ component1, component2, component3 ]
    for ( let c of components ) {
        await c.run()
    }
    
    console.log("Press any key to continue")
    await keypress()
}

async function t007_cli_any_key_to_continue() {
    console.log("\nTEST 007\nCli with Any Key to Continue component")

    const cli = new Cli()
    cli.anyKeyToContinue()
    await cli.run()

    
    console.log("Press any key to continue")
    await keypress()
}

async function t008_cli_with_header_text() {
    console.log("\nTEST 008\nCli with header text")

    const cli = new Cli()
    cli.header('Header Text')
    await cli.run()

    
    console.log("Press any key to continue")
    await keypress()
}

async function t009_cli_with_banner_text() {
    console.log("\nTEST 009\nCli with banner text")

    const cli = new Cli()
    cli.banner('Banner Text')
    await cli.run()

    
    console.log("Press any key to continue")
    await keypress()
}

async function t010_cli_with_header_and_banner_text() {
    console.log("\nTEST 010\nCli with header and banner text")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    await cli.run()

    
    console.log("Press any key to continue")
    await keypress()
}

async function t011_cli_with_header_and_banner_text_and_any_key() {
    console.log("\nTEST 011\nCli with header and banner and any key to continue")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    cli.anyKeyToContinue()
    await cli.run()

    
    console.log("Press any key to continue")
    await keypress()
}



async function t012_application_messages() {
    console.log("\nTEST 012\nCli with application messages")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    cli.message('This is an application message')
    await cli.run()

    console.log("Press any key to continue")
    await keypress()
}

async function t013_application_messages_and_multiple_any_keys() {
    console.log("\nTEST 013\nCli with application messages")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    cli.message('This is an application message')
    cli.anyKeyToContinue()
    cli.anyKeyToContinue()
    await cli.run()

    console.log("Press any key to continue")
    await keypress()
}


async function t014_cursor_position() {
    console.log("\n" + chalk.red("**TEST 014**") + "  Cursor position")
    const position = await getCursorPosition()
    console.log("Cursor position", position)
}

async function t015_spacing_issue() {
    /**
     * Menu component has a spacing issue, this is a Proof of Concept
     * that it should work.
     */

    console.log("\n" + chalk.red("**TEST 017**") + "  Spacing Issue")
    
    let selectedIndex = 0

    async function printOptions() {
        console.log( (selectedIndex == 0 ? ">" : " ") + " Row 1" )
        console.log( (selectedIndex == 1 ? ">" : " ") + " Row 2" )
        console.log( (selectedIndex == 2 ? ">" : " ") + " Row 3" )
    }

    /* this is the fix, changed clearOptions to write "\r\x1b[K" instead of using readline.Clear... */
    async function clearOptions() {
        const pos = await getCursorPosition()
        process.stdout.write("\r\x1b[K")
        readline.cursorTo(process.stdout, 0, pos.row - 1)
        process.stdout.write("\r\x1b[K")
        readline.cursorTo(process.stdout, 0, pos.row - 2)
        process.stdout.write("\r\x1b[K")
        readline.cursorTo(process.stdout, 0, pos.row - 3)
        process.stdout.write("\r\x1b[K")
    }

    await printOptions()

    let userResponded = false
    let userResponse: number
    while( userResponded === false ) {
        const key = await keypress()
        if ( key.name == 'down' ) {
            selectedIndex++
            if ( selectedIndex > 3 - 1) { selectedIndex = 3 - 1 }
            await clearOptions()
            await printOptions()
        }
        if ( key.name == 'up' ) {
            selectedIndex--
            if ( selectedIndex < 0 ) { selectedIndex = 0 } 
            await clearOptions()
            await printOptions()
        }
        if ( key.name == 'return' ) {
            selectedIndex--
            if ( selectedIndex < 0 ) { selectedIndex = 0 } 
            await clearOptions()
            await printOptions()
            userResponded = true
            userResponse = selectedIndex
        }
    }

    console.log("User Response is "  + selectedIndex )
    console.log("Press any key to continue")
    await keypress()
}

async function t016_menu_control() {
    console.log("\n" + chalk.red("**TEST 016**") + "  Menu control")
    
    const c = new CliMenuControl([
        { label: 'Menu Option 1' },
        { label: 'Menu Option 2' },
        { label: 'Menu Option 3' }
    ])
    const response = await c.run()
    console.log( 'Selected', response )

    console.log("Press any key to continue")
    await keypress()
}


async function t017_menu_component() {
    console.log("\n" + chalk.red("**TEST 015**") + "  Menu component")
    
    const c = new NavmenuComponent([
        { label: 'Menu Option 1' },
        { label: 'Menu Option 2' },
        { label: 'Menu Option 3' }
    ])
    const response = await c.run()
    console.log( 'Selected', response )

    console.log("Press any key to continue")
    await keypress()
}



async function t018_enter_to_contnue() {
    console.log("\n" + chalk.red("**TEST 018**") + " Keypress awaits specific key")

    console.log("Press any key to continue")
    await keypress()

    console.log("Press c key to continue")
    await keypress('c')

    console.log("Press return key to continue")
    await keypress('return')

    console.log("Done. Press any key to finish.")
    await keypress()
}


async function t019_vanilla_js_input_field() {
    console.log("\n" + chalk.red("**TEST 019**") + "  Vanilla JS Input field")

    let value = ""

    async function printControl() {
        process.stdout.write("Question> " + value )
    }

    async function clearPrintControl() {
        const pos = await getCursorPosition()
        process.stdout.write("\r\x1b[K")
    }
    
    printControl()

    let userResponded = false
    let userResponse: string
    while( userResponded === false ) {
        const key = await keypress()
        if ( key.name == 'down' ) {
            await clearPrintControl()
            await printControl()
        }
        else if ( key.name == 'up' ) {
            await clearPrintControl()
            await printControl()
        }
        else if ( key.name == 'return' ) {
            userResponded = true
            userResponse = value
        }
        else if ( key.name === 'backspace' ) {
            value = value.substring(0,value.length-1)
            await clearPrintControl()
            await printControl()
        }
        else {
            value += key.sequence
            await clearPrintControl()
            await printControl()
        }
    }

    return value
}


async function t020_input_control() {
    console.log("\n" + chalk.red("**TEST 020**") + "  Input control")

    const control = new CliInputControl()
    const response = await control.run()
    console.log( "Received response: ", response )

    console.log("Press any key to continue")
    await keypress('return')
}

async function t021_input_with_label() {
    console.log("\n" + chalk.red("**TEST 021**") + "  Input with label")

    const control = new CliInputControl('Foo')
    const response = await control.run()
    console.log( "Received response: ", response )

    console.log("Press any key to continue")
    await keypress('return')
}

async function t022_input_with_no_answer() {
    console.log("\n" + chalk.red("**TEST 022**") + "  Input with no answer")

    const control = new CliInputControl('Foo')
    const response = await control.run()
    console.log( "Received response: ", response )

    console.log("Press any key to continue")
    await keypress('return')
}

async function t023_input_with_required() {
    console.log("\n" + chalk.red("**TEST 023**") + "  Input with required")

    const control = new CliInputControl('Foo', { required: true })
    const response = await control.run()
    console.log( "Received response: ", response )

    console.log("Press any key to continue")
    await keypress('return')
}

async function t024_cursor_position() {
    console.log("\n" + chalk.red("**TEST 025**") + "  Moving the cursor")

    const position = await getCursorPosition()
    console.log(position)
}

async function t025_input_with_existing_value() {
    console.log("\n" + chalk.red("**TEST 021**") + "  Input with label")

    const control = new CliInputControl('Foo', { value: 'Anything' })
    const response = await control.run()
    console.log( "Received response: ", response )

    console.log("Press any key to continue")
    await keypress('return')
}



async function t021_input_with_navigable_cursor() {
    // console.log("\n" + chalk.red("**TEST 021**") + "  Input with label")

    // const control = new CliInputControl('Foo')
    // const response = await control.run()
    // console.log( "Received response: ", response )

    // console.log("Press any key to continue")
    // await keypress('return')
}






async function main() {

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(1000) 
    // await t001_keypress()
    // await t002_any_key_to_continue_component()
    // await t003_multiple_any_key_to_continue_components()
    // await t004_banner_component()
    // await t005_banner_and_any_key_to_continue_component()
    // await t006_banner_and_multiple_any_key_to_continue_component()
    // await t007_cli_any_key_to_continue()
    // await t008_cli_with_header_text()
    // await t009_cli_with_banner_text()
    // await t010_cli_with_header_and_banner_text()
    // await t011_cli_with_header_and_banner_text_and_any_key()
    // await t012_application_messages()
    // await t013_application_messages_and_multiple_any_keys()
    // await t014_cursor_position();
    // await t015_spacing_issue();
    // await t016_menu_control();
    // await t017_menu_component();
    // await t018_enter_to_contnue()
    // await t019_move_cursor()
    // await t019_vanilla_js_input_field()
    // await t020_input_control()
    // await t021_input_with_label();
    // await t022_input_with_no_answer()
    // await t023_input_with_required()
    // await t024_cursor_position()
    await t025_input_with_existing_value()

    

}

main()


