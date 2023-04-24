# Agape Cli

Graceful command line applications


## Synopsis

```
import cli from '@agape/cli'
import { FormGroup } from '@agape/forms'
import { Menu } from '@agape/menu'

cli.header('Foo Cli version 1.0.0')

const menu = new Menu().item("Save").item("Cancel")

const form = new FormGroup().string("Name").number("Amount")

const answers = cli.banner("Foo Module")
    .form(form)
    .menu(menu)
    .run()

console.log(answers)
```

## Summary

Create beautiful and functional commnad line applications that accept user input through forms and menus using [@agape/forms](https://www.npmjs.com/package/@agape/forms) and [@agape/menu](https://www.npmjs.com/package/@agape/menu).

## The Cli Object

Use the `cli` object to create and run command line interfaces.

```
import { cli } from '@agape/cli'

cli.display("Some text").run()
```

The `cli` uses a component based archticture with four distinct
areas that will be printed to the screen. There is the *header*,
*banner*, *messages*, and *components* areas. These will be printed to the screen in that order.

The header is defined once on the `cli` and will be printed every
time the `cli` is `run`. The *banner*, *messages*, and *components* are cleared from the `cli` after each run, allowing
the `cli` object to be reused.

You can have multiple `cli` objects in one application by importing the `Cli` class and instantiating yourself.

```
import { Cli } from '@agape/cli'

const cli1 = new Cli().header("Cli 1")
const cli2 = new Cli().header("Cli 2")
```

### Printed Areas

There are four distinct areas that can be printed to the console each time the cli is `run`.

#### Header

Printed at the top of the window. Remains between runs. Set the 
header using the `header` cli method.

##### Example

```
const red    = '\x1b[38;2;231;0;0m'
const green  = '\x1b[38;2;99;167;1m'
const reset  = '\x1b[0m'
cli.header( red + 'קг๏ןєςՇ չє๔' + reset + ' ' + green + 'ᶜᵒᵐᵐᵃⁿᵈ ᴸⁱⁿᵉ' + reset );

cli.run()
cli.run()
```

#### Banner

Printed below the header. Use as a page title area
signifying where in the application you area. Set the banner
using the `banner` cli method. Set a formmatter function to
customize the look of the banner using the `bannerFormat` method
of the `cli` object. The banner formatter will be used for each run. 
The banner text will be cleared between runs.

##### Example

You can use figlet to format the banner.

```
const yellow = '\x1b[38;2;255;241;1m'
const reset  = '\x1b[0m'

cli.bannerFormat( text => {
    const figger = figlet.textSync( 
        text, { font: 'Standard' } 
    )
    return yellow + figger + reset
} )

cli.banner("Some text")
```

#### Messages

A messages area can be used to show messages to the user from
previous cli runs or other operations. Messages can be added
to the cli using the `message` method.

#### Components

This is where all other components end up. You can display 
multiple component in a single cli run. Add components using
cli methods like `form`, `menu`, and `display`.

## Class

`Cli`

### Properties

`components`

Content components that have been added to the UI

`messages`

Messages to display to the user on the next `run`

### Methods

`header( text )`

Set the header text

`banner( text )`

Set the banner text for this run

`bannerFormat( function )`

Set the banner formatter (all runs)

`component( instance )`

Add a component to the `components` list

`display( text )`

Print text to the terminal window

`anyKeyToContinue()`

Add "Press any key to continue" component

`enterToContinue()`

Add "Press enter to continue" component

`form( form )`

Add a form component using `@agape/forms`

`menu( menu )`

Add a menu component using `@agape/menu`

`message( text )`

Add a message to the `messages` list to be display to the user

`run( )`

Run the assembled user interface

## See Also

[@agape/menu](https://www.npmjs.com/package/@agape/menu)

[@agape/forms](https://www.npmjs.com/package/@agape/forms)

[Inquirer](https://www.npmjs.com/package/inquirer)

[Enquirer](https://www.npmjs.com/package/enquirer)

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
