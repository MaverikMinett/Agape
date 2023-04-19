
export class CliHeaderComponent {
    constructor( public text: string ) { }
    
    run( ...args: any[] ) {
        console.log(this.text);
    }
}

