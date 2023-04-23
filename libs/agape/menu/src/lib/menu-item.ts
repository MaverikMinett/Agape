
/**
 * Menu item actions are just callback functions
 */
export type MenuItemAction = (...args:any[]) => any

/**
 * Menu items parameters can be passed in to the MenuItem constructor
 */
export interface MenuItemParams {
    name?: string;
    indicator?: string;
    action?: MenuItemAction
}


function parseMenuItemArgs( args: any[] ) {
    const label = args.shift()
    let action: MenuItemAction
    let params: MenuItemParams
    while ( args.length ) {
        let arg = args.shift();
        if ( typeof arg === 'function' ) action = arg
        else params = arg
    }
    return { label, action, params }
}

/**
 * Abstraction for describing a menu item
 */
export class MenuItem {

    name: string;

    indicator: string;

    label: string

    action: MenuItemAction

    constructor(label: string, action?: MenuItemAction)
    constructor(label: string, params?: MenuItemParams)
    constructor(label: string, action?: MenuItemAction, params?: MenuItemParams)
    constructor(...args: any[]) {
        const { label, action, params } = parseMenuItemArgs(args)
        this.label = label
        this.action = action
        
        if ( params ) Object.assign( this, params )
    }

    /**
     * Execute the action callback function
     */
    async execute() {
        await this.action.call(undefined)
    }
}
