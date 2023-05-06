# @agape/string

String and token manipulation

## Synopsis

```
import { 
    camelize,
    classify, 
    pluralize, 
    titalize, 
    tokenize, 
    verbalize 
} from '@agape/string'

camelize('foo bar')      // fooBar

classify('Foo bar')      // FooBar

pluralize('foo')         // foos

titalize('a foo a bar')  // A Foo a Bar

tokenize('Foo bar')      // foo-bar

verbalize('foo-bar')     // Foo bar
```

## Description

Translate strings between different representations.

## Functions

`camelize`

Convert to camel case.

`classify`

Remove all symbols and spaces, captialize words.

`pluralize`

Adds an 's' to most words. Words that end in 'y' are changed to 'ies', 
words that end in 'us' are changed to 'i'.

`titalize`

The first letter of each word is capitalized with the exception of
`a, an, and, at, be, but, by, for, if, in, of, on, the, to` which are only 
capitalized if they are the first word in the string, otherwise they 
are converted to lowercase.

`tokenize`

Converted to lower case, word boundaries replaced with dashes. 

`verbalize`

First character capitalized, word boundaries replaced with spaces.


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020-2021 Maverik Minett

## License

MIT
