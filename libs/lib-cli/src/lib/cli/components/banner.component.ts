import chalk from 'chalk';
import figlet from 'figlet';

/* import the standard figlet font */
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

export class CliBannerComponent {
    constructor( public text: string, public color:string='yellowBright' ) {

    }

    run() {
        const bannerText = figlet.textSync( this.text, { font: 'Standard' } )
        const chalkMethod = chalk[this.color]
        console.log( chalkMethod.call(undefined, bannerText) )
    }
}
