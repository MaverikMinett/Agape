export type CliBannerFormatFunction = (text: string) => string

export class CliBannerComponent {
    constructor( 
        public text: string,
        public formatter?: CliBannerFormatFunction ) {

    }

    run() {
        const banner = this.formatter 
            ? this.formatter.call(undefined, this.text) 
            : this.text
        console.log( banner )
    }
}
