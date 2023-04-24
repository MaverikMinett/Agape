# Agape Forms

Abstraction for describing a form and it's state


## Synopsis

```
import fb from '@agape/forms'

const form = new FormGroup()
    .string('foo')
    .number('bar') 


form.setValue({'foo': 'Hello World!', 'bar': 42 })

form.value; /*{'foo': 'Hello World!', 'bar': 42 }*/


form.patchValue({'foo': 'Hello there' })

form.value; /*{'foo': 'Hello there', 'bar': 42 }*/

```

## Summary

Create forms simply and elegantly using a builder-style interface

## Class

`FormGroup`

Abstraction representing a collection of form fields

### Properties

`fields`

The fields in the form group

`value`

The value of the form and corresponding fields

`answers`

Synonym for `value`

### Methods

`has( fieldName )`

Does the form group contain a field with the given name

`get( fieldName )`

Retrieve the form field with the given name

`number( name, label )`

Create a new number field and add it to the form

`string( name, label )`

Create a new string field and add it to the form

`patchValue({ name: value, ... })`

Update form field values

`setValue({...})`

Set the value of the entire form group

## Class

`FormField`

Abstraction representing a single form field

###  Properties

`type`

The type of form field, either `number` or `string`

`name`

The name of the form field

`label`

The label for the form field. Generated automatically from the name 
if not explicitly set.

`length`

The length of the form field.

## Class

`FormBuilder`

Create a new form using the form builder

### Synopsis

```
import fb from '@agape/forms`

const form = fb.string('foo')

form instanceof FormGroup; /* true */

```

### Methods

`string(name, label, length)`

Create a new form with a string field

`number(name, label)`

Create a new form with a number field

## Form Field Types

* `number`
* `string`

*Currently only `number` and `string` field types are supported in this version.
Future versions will support `boolean`, `date`, `time`, `datetime`, `text`, and
`array` fields.*


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
