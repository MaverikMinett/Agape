import chalk from 'chalk';

import figlet from 'figlet';

/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

/**
 * Display a banner
 * @param text Banner text
 */
export function banner( text:string, color:string='yellowBright' ) {
    const bannerText = figlet.textSync( text, { font: 'Standard' } )
    const chalkMethod = chalk[color]

    if ( ! chalkMethod ) {
        throw new Error(`Invalid color '${color}'`)
    }
    /* https://instafonts.io/ */
    console.log( chalk.red('קг๏ןєςՇ չє๔') + ' ' + chalk.green('ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ') )
    console.log( chalkMethod.call(undefined, bannerText) )
}
