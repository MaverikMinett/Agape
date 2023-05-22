# Alchemy

Serialization and deserialization of data models


## Synopsis

```
import { Model, Field } from '@agape/model'
import alchemy from '@agape/alchemy'

@Model class Foo {
    @Field foo: string;
    @Field bar: Date;
}

const foo = new Foo()
foo.foo = 'baz'
foo.bar = new Date('2023-05-22T10:00:00Z')

const dto = alchemy.deflate(foo)

const restored = alchemy.inflate(dto)
```

## Description

Create data transfer objects from agape model instance and inflate DTOs back
to model instances.

## Class

`Alchemy`

Build menus using the `item(...)` method

### Properties

`serializers`

Map of serializers that have been registered with the alchemy instance

### Methods

`register( class, serializer )`

Register a serializer for transmuting an object

`inflate( model, flattened )`

Create a model instance from a data transfer object

`deflate( model, instance )`

Create a data transfer object from a model instance

## Interfaces

`Serializer`

### Methods

`inflate( value )`

Restore an object from it's serialized state

`deflate( object )`

Serialize an object

## Types

`Transmuted<T>`

Generic type representing the serialized version of `T`


## Included Serializers

`DateSerializer`

Serializer for inflating and deflating `Date` objects


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
