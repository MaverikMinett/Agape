import { CliMenuControl, CliMenuParams } from '../controls/menu.control';
import { Menu } from '@agape/menu';

export class CliMenuComponent {

    constructor( 
        public name: string,
        public menu: Menu ,
        public params?: CliMenuParams
    ) {

    }

    async run() {
        const stash = {};
        const control = new CliMenuControl(this.menu, this.params)
        const answer = await control.run()
        return { 
            menu: { [this.name]: answer }
        }
    }

}


