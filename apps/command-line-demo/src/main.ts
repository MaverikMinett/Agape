import { AnyKeyToContinueComponent, Cli, CliBannerComponent, CliInputControl, CliMenuControl, CliParagraphElement } from '@lib/cli';

import  readline from 'readline';
import { NavmenuComponent } from './app/navmenu.component';
import { CliMenuComponent } from 'libs/lib-cli/src/lib/components/menu.component';

import { describe, fdescribe, fit, it, expect, runtests, rootSuite } from '@lib/demo'
import { getCursorPosition, getTerminalSize, keypress } from '@lib/terminal'


describe('sanity', 'interactive', () => {
    it('false to be true', async () => {
        expect(false).toBe(true)
    })
})

describe('keypress', 'interactive', () => {
    it('should await a keypress', async() => {
        console.log("\n  Press any key to continue\n")
        const key = await keypress()
        expect(key).toBeTruthy()
    })
    it('it should await specific keypress', async() => {
 
        console.log("Press any key to continue")
        await keypress()
    
        console.log("Press c key to continue")
        await keypress('c')
    
        console.log("Press return key to continue")
        await keypress('return')     
    })
})

describe('describe with interactive keyword', 'interactive', () => {
    it('should await a keypress', async() => {
        console.log("\n  Press any key to continue\n")
        const key = await keypress()
        expect(key).toBeTruthy()
    })
})

describe('AnyKeyToContinueComponent', 'interactive', () => {
    it('should run', async () => {
        const component = new AnyKeyToContinueComponent()
        await component.run()
    })
    it('should run multiple instances', async () => { 
        const component1 = new AnyKeyToContinueComponent()
        const component2 = new AnyKeyToContinueComponent()
        const components = [ component1, component2 ]
        for ( let c of components ) {
            await c.run()
        }
    })
})

describe('BannerComponent', 'interactive', async () => {
    it('should display a banner', async () => {
        const component = new CliBannerComponent('Banner')
        await component.run()
    })
    it('should work with AnyKeyToContinueComponent', async () => {
        const component1 = new CliBannerComponent('Banner')
        const component2 = new AnyKeyToContinueComponent()
        const components = [ component1, component2 ]
        for ( let c of components ) {
            await c.run()
        }
    })
    it('should work with multiple AnyKeyToContinueComponent', async () => {
        const component1 = new CliBannerComponent('Banner')
        const component2 = new AnyKeyToContinueComponent()
        const component3 = new AnyKeyToContinueComponent()
        const components = [ component1, component2, component3 ]
        for ( let c of components ) {
            await c.run()
        }
    })
})

describe('Cli', 'interactive', () => {
    it('should instantiate', () => {
        const c = new Cli()
        expect(c).toBeTruthy()
    })
    describe('anyKeyToContinue', () => {
        it('should run the component', async () => {
            const cli = new Cli()
            cli.anyKeyToContinue()
            await cli.run()
        })
    })
    describe('header', ()  => {
        it('should run the component', async () => {
            const cli = new Cli()
            cli.header('Header Text')
            await cli.run()
        })
    })
    describe('banner', () => {
        it('should run the component', async () => {
            const cli = new Cli()
            cli.banner('Banner Text')
            await cli.run()
        })
    })

    describe('menu', () => {
        it('should run the component', async () => {
            const cli = new Cli()
            cli.menu('fooMenu',[
                { label: 'Menu Option 1' },
                { label: 'Menu Option 2' },
                { label: 'Menu Option 3' }
            ])
            const response = await cli.run()
            console.log( 'Cli Response:', response )
        })
    })
    describe('message', ()  => {
        it('should run the component', async () => {
            const cli = new Cli()
            cli.message('This is an application message')
            await cli.run()
        })
    })
    describe('run multiple cli components', () => {
        it('should run header and banner', async () => {
            const cli = new Cli()
            cli.header('Header Text')
            cli.banner('Banner Text')
            await cli.run()
        })
        it('should run header and banner and any key to continue', async () => {
            const cli = new Cli()
            cli.header('Header Text')
            cli.banner('Banner Text')
            cli.anyKeyToContinue()
            await cli.run()
        })
        it('should run header and banner and messages', async () => {
            const cli = new Cli()
            cli.header('Header Text')
            cli.banner('Banner Text')
            cli.message('This is an application message')
            await cli.run()
        })
        it('should run header and banner and messages and multiple any keys', async () => {
            const cli = new Cli()
            cli.header('Header Text')
            cli.banner('Banner Text')
            cli.message('This is an application message')
            cli.anyKeyToContinue()
            cli.anyKeyToContinue()
            await cli.run()
        })
    })
})

describe('cursorPosition', 'interactive', () => {
    it('should run', async () => {
        const position = await getCursorPosition()
        console.log("Cursor position", position)
    })
})

describe('vanilla js menu component', 'interactive', () => {
    it('should run', async () => {
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
    })
})

describe('CliMenuControl', 'interactive', () => {

    it('should instantiate', () => {
        const c = new CliMenuControl([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        expect(c).toBeTruthy()
    })

    it('should run', async () => {
        const c = new CliMenuControl([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })

})

describe('CliMenuComponent', 'interactive', () => {

    it('should instantiate', () => {
        const c = new CliMenuComponent('fooMenu',[
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        expect(c).toBeTruthy()
    })

    it('should run', async () => {
        const c = new CliMenuComponent('fooMenu',[
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })

})

describe('NavMenuComponent', 'interactive', () => {
    it('should run', async () => {
        const c = new NavmenuComponent([
            { label: 'Menu Option 1' },
            { label: 'Menu Option 2' },
            { label: 'Menu Option 3' }
        ])
        const response = await c.run()
        console.log( 'Selected', response )
    })
})

describe('vanilla js input field', 'interactive', () => {
    it('should run', async () => {
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
    })
})


fdescribe('CliInputControl', 'interactive', () => {
    it('should run', async () => {
        const control = new CliInputControl()
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with label', async () => {
        const control = new CliInputControl('Foo')
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with no answer', async () => {
        const control = new CliInputControl('Foo')
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with required', async () => {
        const control = new CliInputControl('Foo', { required: true })
        const response = await control.run()
        console.log( "Received response: ", response )
    })
    it('input with exisiting value', async () => {
        const control = new CliInputControl('Foo', { value: 'Anything' })
        const response = await control.run()
        console.log( "Received response: ", response )    
    })
    it('input with exisiting value and preset cursor position', async () => {
        const control = new CliInputControl(
            'Foo', 
            { value: 'Anything', cursorPosition: 3 }
        )
        const response = await control.run()
        console.log( "Received response: ", response )   
    })
    it('input with exisiting value and preset cursor position via properties', async () => {
        const control = new CliInputControl('Foo')

        control.value = 'Everything'
        control.cursorPosition = 3
    
        const response = await control.run()  
    })
})

describe('cursor position', 'interactive', () => {
    it('should run', async () => {
        const position = await getCursorPosition()
        console.log(position)
    })
})

describe('getTerminalSize', 'interactive', () => {
    it('should run', async () => {
        const size = getTerminalSize()
        console.log(size)
    })
})

describe('CliParagraphElement', 'interactive', () => {
    it('should run', async () => {
        const lorum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
        mollit anim id est laborum.`
   
       const e = new CliParagraphElement( lorum )
       await e.run()
    })
})

describe('colors', 'interactive', () => {
    it('no libs', async () => {
    // standard 16 colors
    console.log("\x1b[31m" + "Required" + "\x1b[0m")

    // 255 extended color palette
    console.log("\x1b[38;5;244m" + "Required" + "\x1b[0m")
    console.log("\x1b[38;5;135m" + "Required" + "\x1b[0m")
    // ESC[38:5:⟨n⟩m Select foreground color      where n is a number from the table below
    // ESC[48:5:⟨n⟩m Select background color

    // full color palette with rgb color
    console.log("\x1b[38;2;81;134;219m" + "Required" + "\x1b[0m")
    console.log("\x1b[38;2;98;155;234m" + "Required" + "\x1b[0m")
    })
})


async function testMain() {
    console.log("Starting main")
    await runtests()
}

testMain()
