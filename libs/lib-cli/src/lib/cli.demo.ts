import { Cli } from "@lib/cli"
import { describe, expect, it } from "@lib/demo"

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