
import chalk from 'chalk';
import { eventsIndex } from './app/events/views';
import { cli } from './lib/cli'

cli.header( chalk.red('קг๏ןєςՇ չє๔') + ' ' + chalk.green('ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ') );

/** main **/
async function main() {
    await eventsIndex()
}

main();