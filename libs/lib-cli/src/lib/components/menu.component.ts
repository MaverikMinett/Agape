import { CliMenuControl, CliMenuItem, CliMenuParams } from '@lib/cli';

export class CliMenuComponent {

    constructor( 
        public name: string,
        public items: CliMenuItem[] = [] ,
        public params?: CliMenuParams
    ) {

    }

    async run() {
        const stash = {};
        const control = new CliMenuControl(this.items, this.params)
        const answer = await control.run()
        return { 
            menu: { [this.name]: answer }
        }
    }

}


