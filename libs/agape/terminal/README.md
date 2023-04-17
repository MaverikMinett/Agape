# Agape Terminal

Await keypress from user, hide/move/query the cursor, get window size


## Synopsis

```
async main() {
    await keypress(); 
    await keypress('return')
}
```


## Summary

A collection of functions for interacting with and querying the user terminal


## Keypress

`keypress(), keypress(key: string)`

Wait for the user to press a key.


## Cursor

`getCursorPosition()`

Get the cursor position

`setCursorPosition({ row: number, col: number})`

Set the cursor position

`hideCursor()`

Hide the cursor

`showCursor()`

Show the cursor


## Terminal

`getTerminalSize()`

Get the size of the terminal in `rows` and `columns`.


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
