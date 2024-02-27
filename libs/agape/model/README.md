# @agape/model

Descriptive data models

## Synopsis

```ts

@Model class FooModel {

    @Field foo: string
    
    @Field bar: number

    @Field baz: string[]
    
}


```

## Description

Annotate class based object models

## About

Models can be used as database schemas, to create rules for
validating api payloads, create rules for serializing and
deserializing objects for transferring over a network, and
for defining Angular forms. The model library provides
ways to annotate the models, while it is up to a consuming
library to breathe life into the models and determine how
they are used functionally. 

The idea behind the model is that it is a single source of 
truth. The model defines how to persist objects to a database,
validate payloads, and display themselves as forms, tables, or
a detailed view on the frontend.

## Concepts

### Models

Declare a class as a model using the `@model` decorator. Declaring a model creates a model descriptor where meta-data about the model is stored.

### Fields

Declare a field on the property of a class. Declaring a field adds
a field descriptor to the model and can storers information such
as the type of the property and validation rules. [@agape/orm](../orm/README.md) uses the fields of a model to define the database scheme, and for knowing what fields to store and retrieve. [@agape/alechmy] uses the field descriptors to inform rules on how to
serialize and deserialize the model.

### Views

A view is declared on a class using the View decorator. A view is derived from a model and represent only a slice of that model. Views can be used to query only certain fields on an ORM or determine which fields from a model should be displayed in a form. View descriptors contain field descriptors just like a model, but it gets the field information from the parent model descriptor.

### Document

Documents are a special type of model which have a primary key. Documents can be persisted to a database selected from a list of
choices using the primary key.


## Class Decorators

### `@Model`

Declare a class as a model.

```
@Model class Foo {
    
}
```

###

## Abstract Classes


## Property Decorators

`@Field`

Declare a model field. Fields are properties of a class. Declaring
a field stores information about the property on the Model descriptor. Declaring

`@Primary`

Designate a field as the primary key. This field is a flag for the
orm to know which field is the id to store the record in the database, or the value to use when selecting objects in a form. 

`@Required`

Designate a field as being required. This means that the field
should be a non-empty value, meaning not null, undefined, an empty string, or an empty array. Used when validating payloads and forms.

`@Optional`

Designate a field as optional. These means that the property does
not need to exist on the object. Fields marked as optional should
also have a `?` added to end of the property name when declared.

`@Enum( enum )`

Designate the field as enum. Used to validate payloads, populate
forms, and to list the available choices in swagger documentation.

`@Choices( choices )`

Desginate the available choices for field. Used when populating
forms.

`@Default( value )`

Designate a default value for the field. Used to populate forms,
instantite models as plain old javascript object using the `initialize` function, and documented in the swagger documentation.

`@Integer`

Designate the field as an integer. Use with `number` properties.
The property will be validated as an integer when performing
validation. This designation is also be used in SQL databases when
declaring the data type for the column. *Note: Currently the orm
does not support SQL databases.*

`Decimal( decimals )`

Designate a field as a decimal number. Use with `number` properties. Specify the maximum number of decimal places that should the number should have. This will be used during validation,
and when formatting the number in the frontend, such as in a form
field or table. This designation will also be used in SQL databases
when declaring the data type for the column. *Note: Currently the orm does not support SQL databases.*

`@Text`

Designate the field as a text field. Use with `string` properties.
Text fields know to display themselves as textarea widgets on the
frontend. The designation will also be used in SQL databases when
declaring the data type for the column.


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2022-2023 Maverik Minett


## License

MIT
