
import chalk from 'chalk';
import figlet from 'figlet';
import { eventsIndex } from './app/events/views';
import { cli } from '@agape/cli'

/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

cli.header( chalk.red('קг๏ןєςՇ չє๔') + ' ' + chalk.green('ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ') );

cli.bannerFormat( (text) => {
    const figger = figlet.textSync( text, { font: 'Standard' } )
    const colored = chalk.yellowBright(figger)
    return colored
} )

/** main **/
async function main() {
    await eventsIndex()
}

main();