
import chalk from 'chalk';
import figlet from 'figlet';
import { eventsIndex } from './app/events/views';
import { cli } from '@lib/cli'

/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

cli.header( chalk.red('קг๏ןєςՇ չє๔') + ' ' + chalk.green('ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ') );


/** main **/
async function main() {
    await eventsIndex()
}

main();