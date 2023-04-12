
import cli from '@lib/cli'
import { keypress } from '@lib/cli'
import { AnyKeyToContinueComponent } from 'libs/lib-cli/src/lib/components/any-key-to-continue.component'

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
}

async function main() {
    await t001_keypress()
    await t002_any_key_to_continue_component()
}

main()


