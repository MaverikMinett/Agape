# Agape

Application tookit

## Description

Agape is a collection of libraries for bulding DRY web applications in TypeScript. 

## Web Application Framework

[@agape/model](libs/agape/model/README.md)

Declaritive data models. Models are used to query the ORM, 
validate API payloads, render forms, and serialize objects to
be sent over a network. Define your model one time and the corresponding
views to the database, represent api payloads, restore objects that
have been serialized for transferring over a network.

[@agape/api](libs/agape/api/README.md)

A library for building Rest APIs built on Express. Payloads and
query parameters coming from the front-end are validated against
models. Use those same models and views for storing and retrieving entities
from the ORM.

[@agape/orm](libs/agape/orm/README.md)

Use data models to perform CRUD operations on a Mongo database. Instead
of creating a database schema and various interfaces to represent your data
structures, a model declartion are used in database queries

[@agape/alchemy](libs/agape/alchemy/README.md)

Serialize and deserialize data models for sending and receiving over a network. 
Create rules about how models are transformed into json objects to be sent from
an API. Use those same rules to restore those objects on the frontend. Perform
validation the backend when receiving a payload from the front end.

## Other Libraries

[@agape/string](libs/agape/string/README.md)

String manipulation. Transform text into various formats. Used by
the web application framework for creating labels and tokens for
entities

[@agape/object](libs/agape/object/README.md)

Advanced object system for designing TypeScript classes using traits

[@agape/templateer](libs/agape/templateer/README.md)

Process and render handlebar templates

## Author

Maverik Minett  maverik.minett@gmail.com

## Copyright

© 2020-2024 Maverik Minett

## License

MIT
