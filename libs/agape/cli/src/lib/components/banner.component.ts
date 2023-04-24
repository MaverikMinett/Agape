


export type CliBannerFormatFunction = (text: string) => string

/**
 * Display a banner
 */
export class CliBannerComponent {

    constructor( 
        public text: string,
        public formatter?: CliBannerFormatFunction ) {

    }

    /**
     * Run the banner component
     */
    run() {
        const banner = this.formatter 
            ? this.formatter.call(undefined, this.text) 
            : this.text
        console.log( banner )
    }
}
