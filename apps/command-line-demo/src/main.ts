
import chalk from 'chalk';
import { Cli, keypress } from '@lib/cli'
import { AnyKeyToContinueComponent } from 'libs/lib-cli/src/lib/components/any-key-to-continue.component'
import { CliBannerComponent } from 'libs/lib-cli/src/lib/components/banner.component'
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

async function t014_menu() {
    console.log("\nTEST 014\nCli with menu")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    cli.message('This is an application message')
    cli.menu('Foo Menu',  [
        { label: 'Menu Option 1' },
        { label: 'Menu Option 2' },
        { label: 'Menu Option 3' }
    ])
    await cli.run()

    console.log("Press any key to continue")
    await keypress()
}




async function t015_menus() {
    console.log("\n" + chalk.red("**TEST 015**") + "  Cli with menu")
    
    const c = new NavmenuComponent([
        { label: 'Menu Option 1' },
        { label: 'Menu Option 2' },
        { label: 'Menu Option 3' }
    ])
    await c.run()

    // const cli = new Cli()
    // cli.header(chalk.green('𝓬ₒₘₘₐₙ𝓭 ₗᵢₙₑ 𝓬ₒₘₚₒₙₑₙₜₛ'))
    // cli.banner('Banner Text')
    // // cli.menu('Foo Menu',  [
    // //     { label: 'Menu Option 1' },
    // //     { label: 'Menu Option 2' },
    // //     { label: 'Menu Option 3' }
    // // ])
    // cli.component(NavmenuComponent, { 
    //         options: ,

        
    // } )
    // await cli.run()

    console.log("Press any key to continue")
    await keypress()
}

async function t015_consecutive_menus() {
    console.log("\nTEST 015\nCli with multiple consecutive menus")

    const cli = new Cli()
    cli.header('Header Text')
    cli.banner('Banner Text')
    cli.message('This is an application message')
    cli.menu('Foo Menu',  [
        { label: 'Menu Option 1' },
        { label: 'Menu Option 2' },
        { label: 'Menu Option 3' }
    ])
    // cli.menu('Bar Menu',  [
    //     { label: 'Menu Option 1' },
    //     { label: 'Menu Option 2' },
    //     { label: 'Menu Option 3' }
    // ])
    await cli.run()

    console.log("Press any key to continue")
    await keypress()
}

async function main() {
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
    // await t014_menu()
    await t015_menus()

}

main()


