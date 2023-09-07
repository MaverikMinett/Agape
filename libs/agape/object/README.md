# @agape/object

Extensible objects

## Synopsis

```
import { include, stack } from '@agape/object'

class MyTrait {

    foo: string
    
    bar() {
        console.log( this.foo )
    }

}

export interface MyObject extends MyTrait { }

@include( MyTrait )
class MyObject {

}

let o = new MyObject()
o.foo = "foobar"
o.bar()
```


## Description

A collection of decorators and meta descriptors for composing extensible 
javascript objects.

## Installation

```
npm install @agape/object @agape/types
```

## Traits

Traits are abstract classes which define or modify properties and methods
on a consuming class. Traits can be used as an alternative to or in combination
with classical inheritance to create clean, reusable, and extensible code. Traits 
are applied to classes using the `@include` decorator.


## Class Decorators

`@include( ...traits )`

Add the `...traits` to the class.

All method definitions in each trait will be copied into the consumer
unless already defined. All method modifiers will be copied into the 
consumer. All property modifiers will be copied into the consumer. 

Existing property and method definitions in the consumer will not be
over-written with those defined in a trait unless declared in conjuction
with `override` decorator.

```
@include( MyTrait )
class MyClass {
    ...
```


## Method Modifiers

Method modifiers are decorators which affect the behavior of the method. Most
method modifiers allow you to call aditional methods before or after the
primary method call. When a trait is applied to a class, all the method 
modifiers are copied from the trait into the consumer. This allows traits
to modify the behavior of consumers.

Modifiers can be *stacked*, meaning you can apply the same modifier multiple
times to the same method. The modifiers will be called in the same order in
which they were applied.

`@after`

Executes after the primary method.

`@before`

Executes before the primary method.

`@stack`

Executes after the primary method but before any `after` modifiers.

`@override`

Over-rides the primary method. Use this to replace the default implementation
while maintaining any method modifiers which have been applied.

### Method Modifiers Example

```

class ATrait {
    
    @before
    foo() {
        console.log("Called first")
    }

}


class BTrait {

    @stack
    foo() {
        console.log("Called third")
    }

}

class CTrait {

    @stack
    foo() {
        console.log("Called fourth")
    }

}


class DTrait {

    @after
    foo() {
        console.log("Called fifth")
    }

}

@include( ATrait, BTrait, CTrait, DTrait )
class MyObject {

    foo() {
        console.log("Called second")
    }

}

var o = new MyObject()
o.foo()

```


## Property Modifiers

`@build`, `@build( methodName )`

User a builder method to provide the default value for the property.

If called without arguments, `methodName` will default to the property
name pre prefixed with `_build_`. For example the
builder method for property `foo` will default to `_build_foo`.

`@coerce`
`@coerce( to:Class|[Class] )`
`@coerce( to:Serializer|[Serializer])`

For use with `inflate` and `deflate`. Specify the concrete classes to create
from serialized data.


`@delegate( o => to )`, `@delegate( o => to, propertyName )`

Delegate to the property of another object. Both reading or writing of the 
property will be delegated to the `to` object. You may optionally specify
an alternative property name on the `to` object.


`@inherit( o => from )`, `@inherit( o => from, propertyName )`

Inherit the property from another object if it has not been explicitly set 
on the object itself. This is similar to `delegate` and different 
from typical class based inheritance. 

Writing of the property always happens on the object itself. Reading of
property will return the value from the object istelf if it has been set, 
otherwise the value on the `from` object will be used. You may optionally 
specify the different property name on the `from` object which to inherit from.


`@lazy`, `@lazy( defaultValue )`, `@lazy( o => defaultValue )`

Create a lazily loaded property. If the property has not been set it will
be instantiated using the default value the first time it is accessed.

Can be called without arguments, in which case the existing default value
is used to populate the property, or can be called with the default value
as the first and only parameter. Accepts either a primitive value or a 
callback which returns an object or data structure. The object 
instance is available in the callback as the first argument *and* as the 
the `this` variable when not inside a fat-arrow function.

Can be used in conjunction with `build`.

`@nonenumeral`

The property will not be included when iterating over the object using
`for ... in` or returned as a result from `Object.keys`. The property
will not be included when serializing using `deflate` or `JSON.stringify`,
or when printing the object using `console.log`. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties" target="_blank">More information</a>


`@override`

Override the value in an existing property descriptor. This allows traits 
to over-ride properties defined in consumers.


`@readonly`

This property will be read only. Attempting to set this property will
raise an exception. Use in conjunction with another decorator which 
provides a value such as `lazy`, `delegate`, or `build`.



## Functions

`deflate( object )`

Deflate a constructed object to an object literal. Use for serializing objects
to be passed through APIs or stringified as JSON.  Delegated and inheritied 
properties are not serialized. Returns a javascript object literal.

`inflate( to:Class|[Class], data:Dictionary|Dictionary[] )`

Instantiate an object or array of objects of the specified class type using
the provided data. Properties which have been decoratored with `@coerce` will
also be inflated to allow for deserialization of nested objects.

`unveil( object )`

Returns a psuedo-object which contains the current state of all enumerable data 
properties on the original. This is useful for inspecting objects which utilize
property decorators or inherit properties through the prototype chain. 


## Caveats

### TypeScript Definitions

When defining properties or methods via a trait it necessary to inform typescript
of the definitions. This can be accomplished using an interface. For example:

```
import { include } from '@agape/object'

class MyTrait {

    foo() {
        console.log('Called foo')
    }

}


export interface MyObject extends MyTrait { }

@include( MyTrait )
export class MyObject {

}

let o = new MyObject()

o.foo()
```

### Default Property Values in Traits

When creating a property on a trait, do not set the default value
as you normally would. 

Bad:
```
class MyTrait {

    foo: string = "bar"

}
```


When compiled to JavaScript this actually results in the default value of `foo`
being set in the constructor of the `MyTrait` class, and therefore is not
transferred over into any consuming classes. Instead use the `lazy` or `build`
decorators to set a default value:

Good:
```
class MyTrait {

    @lazy( "bar" )
    foo:string

}
```

Also good:
```
class MyTrait {

    @build
    foo:string

    _build_foo() {
        return "bar"
    }

}

```


### Build and Lazy

As it stands properties defined with the `@build` decorator are also lazy, meaning the value is not set at object construction time but when the property is first accessed. This may change in the future. If you want to ensure that the property is lazy, define it as such explicitly using the `@lazy` decorator in conjuction with `@build`.

```

class MyTrait {

    @lazy @build
    foo:string

    _build_foo() {
        return "bar"
    }

}

```


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020-2023 Maverik Minett


## License

MIT
