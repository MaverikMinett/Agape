import chalk from 'chalk';
import figlet from 'figlet';

export class CliBannerComponent {
    constructor( public text: string, public color:string='yellowBright' ) {

    }

    async run() {
        const bannerText = figlet.textSync( this.text, { font: 'Standard' } )
        const chalkMethod = chalk[this.color]
        console.log( chalkMethod.call(undefined, bannerText) )
    }
}
