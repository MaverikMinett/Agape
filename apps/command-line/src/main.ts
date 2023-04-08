
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';


/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);


/* model */
interface Event {
    name: string;
}

const events: Event[] = []


/** main **/
function main() {

    clear()

    banner( 'Events' )     

}


/**
 * Display a banner
 * @param text Banner text
 */
function banner( text:string, color:string='yellowBright' ) {
    const bannerText = figlet.textSync( text, { font: 'Standard' } )
    const chalkMethod = chalk[color]

    if ( ! chalkMethod ) {
        throw new Error(`Invalid color '${color}'`)
    }

    console.log( chalkMethod.call(undefined, bannerText) )
}


main();