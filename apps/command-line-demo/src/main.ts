
import chalk from 'chalk';
import cli from '@lib/cli'
import inquirer from 'inquirer';

import { keypress } from '@lib/cli'

async function t001_keypress() {
    console.log("\nTEST 001\n")
    console.log("Press any key to continue")
    await keypress()
    console.log("Success")
}

async function t002_any_key_to_continue_component() {
    console.log("\nTEST 002\n")
    cli.banner("002")
    await cli.run()

    console.log("Press any key to continue")
    await keypress()
}

async function main() {
    await t001_keypress()
    await t002_any_key_to_continue_component()
}

main()


