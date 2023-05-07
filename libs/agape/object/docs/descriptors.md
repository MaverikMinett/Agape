
# Object Descriptor

Object meta-data

## Synopsis

```

import { ObjectDescriptor } from '@agape/object/descriptors'

class SimpleObject { }

var d = new ObjectDescriptor( SimpleObject )

/* add a method to the class */
d.method('foo').default( () => { console.log('Foo') } )

/* add a property to the class */
d.property('bar').default('baz')


var o = new SimpleObject()
o.foo()              // "foo"
console.log(o.bar)   // "baz"
```

## Description

Define and introspect object meta-data.


## Properties

- `traits`

List of traits which have been applied to the object. Readonly.

## Methods

- `include( ...traits )`

Apply the traits to the object or prototype.  All property and method
implementations and modifiers will be copied from the traits to the target.

- `method( name )`

Returns the MethodDescriptor for the method with the given name. If the method
does not already exist, a new MethodDescriptor will be created and the method
will be defined on the object or prototype.

- `property( name )`

Returns the PropertyDescriptor for the property with the given name. If the property
does not already exist, a new PropertyDescriptor will be created and the property
will be defined on the object or prototype.

## See Also

- MethodDescriptor
- PropertyDescriptor



# Method Descriptor

Method meta-data

## Synopsis

```
import { MethodDescriptor } from '@agape/object/descriptors'

var d = new MethodDescriptor( 'foo' )

d.default( () => { console.log('Foo') } )

var o = {}

d.install_dispatcher( o )

o.foo()    // "Foo"
```

## Description

Define and introspect method meta-data.

## Methods

Define modifiers using these methods. Any modifiers which
have been applied to the method will also be called using
the same parameters.

- `after( () => void )`

Called after the method implementation.

- `before( () => void )`

Called before the method implementation.

- `default( () => void )`

Sets the default method implementation.

- `override( () => void )`

Over-rides the default implementation.

- `stack( () => void )`

Called after the default method implementation, but before the `after` modifier.

## Properties

- `name`

The name of the method.

- `progenitor`

The object on which the method exists.



# Property Descriptor

Property meta-data

## Synposis

```
import { PropertyDescriptor } from '@agape/object/descriptors'

var d = new PropertyDescriptor( 'foo' )

d.default( () => { ['bar'] } )

var o = {}

d.install_dispatcher( o )

o.foo()    // "['bar']"
```

## Description

Define and introspect property meta-data.

## Methods

- `default`

Set the default value for the property.

- `override`

Over-ride the default value for the property.

- `inherit`

- `readonly`

- `nonenumerable`

- `delegate`

## Properties

- `name`

The name of the method.

- `progenitor`

The object on which the property exists.