

export class CliDisplayComponent {

    strings: string[]
  
    constructor( ...text: string[] )  {
        this.strings = text        
    }

    async run() {
        for ( let string of this.strings ) {
            console.log(string)
        }
    }

}