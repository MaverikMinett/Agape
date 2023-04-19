

export type MenuItemAction = (...args:any[]) => any

export interface MenuItemParams {
    name?: string;
    indicator?: string;
}

class MenuItem {
    name: string;

    constructor( 
        public label: string, 
        public action?: MenuItemAction, 
        public params?: MenuItemParams ) {
        
        if ( params ) Object.assign( this, params )
    }

    async execute() {
        await this.action.call(undefined)
    }
}


export class Menu {

    items: MenuItem[] = []

    selectedIndex: number = -1

    get selectedItem() {
        if ( this.selectedIndex === -1 ) return undefined
        else return this.items[this.selectedIndex]
    }

    item( label: string, action: MenuItemAction ): this
    item( label: string, action: MenuItemAction, params: MenuItemParams ): this
    item( label: string ): this
    item( label: string, action?: MenuItemAction, params?: MenuItemParams ): this {
        const item = new MenuItem( label, action, params )
        this.items.push( item )
        return this
    }

    selectItem( item: MenuItem ) {
        if ( item === undefined || item === null ) {
            this.selectedIndex = -1
        }
        else {
            const index = this.items.indexOf( item )
            if ( index === -1 ) throw new Error(`Could not find menu item '${item.label}'`)
            this.selectedIndex = index
        }
        return this
    }

    selectIndex( index: number ) {
        if ( index > this.items.length - 1) {
            throw new Error(`Could not set selected index to ${index}, exceeds number of menu items`)
        }
        this.selectedIndex = index
        return this
    }

    async execute() {
        await this.selectedItem?.execute()
    }

}