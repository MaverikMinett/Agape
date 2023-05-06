# @agape/model

Object relational mapping for data models

## Synopsis

```ts

@Model class Foo {

    @Primary id?: string

    @Field foo: string
    
    @Field bar: number

    @Field baz: string[]
    
}

const orm = new Orm()

const connection = new MongoConnection(DATABASE_URL);
const database = new MongoDatabase(connection, 'foo')
orm.registerDatabase('default', database)
orm.registerModel(Foo)

let foo = new Foo()
foo.foo = "Hello World"
foo.bar = 42
foo.baz = ['foo','bar','baz']

let { id } = orm.insert(Foo, foo)     // create

foo = orm.retrieve(Foo, id).exec()    // retrieve

foo.bar = 57

orm.update(Foo, id, foo)              // update

let foos = orm.list(Foo).exec()       // list

orm.delete(Foo, id).exec()            // delete

```

## Description

Currently only Mongo database connections are supported.

## Connecting

```ts
const connection = new MongoConnection(DATABASE_URL);
const database = new MongoDatabase(connection, 'foo')
orm.registerDatabase('default', database)
```

`new MongoConnection('mongodb://localhost:27017')`

Create a new mongo connection using a mongdb address

`new MongoDatabase(connection, dbName)`

Connect to a database

`orm.registerDatabase('default', database)`

Register the database with the orm


## Models

`orm.registerModel(Foo)`

Register the model with the orm

## Queries

Execute queries against the orm using the model

### Insert

```ts
let foo = new Foo()
foo.foo = "Hello World"
foo.bar = 42
foo.baz = ['foo','bar','baz']

let { id } = orm.insert(Foo, foo)   
```

### Retrieve

```ts
foo = orm.retrieve(Foo, id).exec()  
foo = orm.retrieve(Foo, id).inflate() 
```

### Execute vs Inflate

```ts
foo = orm.retrieve(Foo, id).exec()
foo instanceof Foo; // false
```

Calling `.exec()` will return a plain old javascript object, not an
instance of the model, the equivalent type would be `Pick<Foo, keyof Foo>`.

```ts
foo = orm.list(Foo, id).inflate()
foo instanceof Foo; // true
```

Calling `.inflate()` will return an instance of the model.


### List

```ts
foos = orm.list(Foo).exec() 
foos = orm.list(Foo).list() 
```

### Update

```ts
orm.update(Foo, id, foo) 
```

### Delete

```ts
orm.delete(Foo, id).exec() 
```

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
