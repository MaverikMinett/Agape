
import chalk from 'chalk';
import figlet from 'figlet';
import { eventsIndex } from './app/events/views';
import { cli } from '@agape/cli'

/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

const yellow = '\x1b[38;2;255;241;1m'
const red    = '\x1b[38;2;231;0;0m'
const green  = '\x1b[38;2;99;167;1m'
const reset  = '\x1b[0m'

cli.header( red + 'קг๏ןєςՇ չє๔' + reset + ' ' + green + 'ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ' + reset );

cli.bannerFormat( (text) => {
    const figger = figlet.textSync( text, { font: 'Standard' } )
    const colored = yellow + figger + reset
    return colored
} )

/** main **/
async function main() {
    await eventsIndex()
}

main();