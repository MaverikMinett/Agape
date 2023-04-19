

export class CliDisplayComponent {

    text: string[]
  
    constructor( ...text: string[] )  {
        this.text = text        
    }

    run() {
        for ( let text of this.text ) {
            console.log(text)
        }
    }

}