import { CliMenuControl } from '@lib/cli';

export interface NavmenuItem {
    key?: string
    label: string;
}

export class NavmenuComponent {

    // selectedItem: NavmenuItem

    constructor( public items: NavmenuItem[] = [] ) {
        // this.selectedItem = items[0]
    }

    async run() {
        const control = new CliMenuControl(this.items)
        return control.run()
    }

}


