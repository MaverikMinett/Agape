
import chalk from 'chalk';
import cli from '@lib/cli'
import inquirer from 'inquirer';

async function main(){
    cli.header( chalk.red("🅲 🅻 🅸") )
    cli.banner("BANNER")
    cli.display("Display Banner - Show the CLI Header and Banner Components")
    await cli.run()

    const pressAnyKey = require('press-any-key');
    
    try {
        await pressAnyKey("Press any key to continue")
        console.log("JUICE, SQUEEZE")
    }
    catch {
        console.log("JUICE, CANCELLED")
    }

}

main()



