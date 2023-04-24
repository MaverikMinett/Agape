# Agape Menu

Abstraction for describing a menu and it's state


## Synopsis

```
import { Menu } from '@agape/menu'

let [foo, bar] = [0,0]

const menu = new Menu()
    .item("Foo Item", () => foo++)
    .item("Bar Item", () => bar++) 

menu.selectIndex(0)
menu.execute()   
foo; /* 1 */
```

## Class

`Menu`

Build menus using the `item(...)` method

### Properties

`items`

The items in the menu

`selectedIndex`

The index of the currently selected menu item

`selectedItem`

The currently selected menu item

### Methods

`item( label, action, params )`

Create and add an item to the menu

`selectItem( item )`

Select an item 

`selectIndex( index )`

Select an item via it's index

`execute()`

Execute the action for the selected item

## Class

`MenuItem`

### Properties

`action`

Callback to execute when item is selected

`indicator`

Indicator to display for the menu item

`label`

Menu item label

`name`

Menu item name

## Methods

`execute()`

Execute the action for the menu item

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
