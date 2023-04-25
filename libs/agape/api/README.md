# Agape API

Framework for building APIs


## Synopsis

```
@Service()
class FooService {
    foo() {
        return { "message": "BARRRRGGHHHHH" }
    }
}

@Controller()
class FooController {

    constructor( public service: FooService ) {

    }

    @Get('foo')
    foo() {
        return this.service.foo()
    }
}

@Module({
    controllers: [FooController]
})
class FooModule() { }


const app: Application = express();
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

const router = Router()
bootstrapExpress(router, FooModule)

app.use('/api', router )
```

## Summary

Model-View-Controller APIs

## Application Components

There are three primary components to an API application. Modules,
Controllers, and Services. 

### Controllers

Controllers respond to routed requests by interacting with services
and returning a response to be sent back to the end user.  The `Controller`
class decorator is used to designate a class as a controller.

#### Class Decorator

`Controller`

##### Example

```
@Controller('path/to/controller')
class FooController {
    ...
}
```

#### Method Decorators

One method decorator for each HTTP request.

`Get`

`Post`

`Put`

`Patch`

`Delete`

And for the HTTP status

`Status`

And for the possible responses

`Respond`

For the possible responses. Accepts

##### Example

```
@Controller('foos')
class FoosController {

    @Get()
    list() {

    }

    @Post()
    create( params: undefined, body: IEvent ) {
        ...
    }

    @Get(':id')
    retrieve( params: { id: string } ) {
        ...
    }

    @Put(':id')
    update( params: { id: string }, body: IEvent ) {
        ...
    }

    @Patch(':id')
    update( params: { id: string }, body: Partial<IEvent> ) {
        ...
    }

    @Delete(':id')
    retrieve( params: { id: string } ) {
        ...
    }

}
```

### Services

Services are injected into controllers and other services through the contstructor.

Declare a service using the `Service` decorator. Only one instance of a service is
used across the entire application via dependency injection.

#### Class Decorator

`Service`

##### Example

```
@Service()
class FooService {
    
    foo() {
        ...
    }

}

@Service() 
class BarService {
    constructor( public foo: FooService ) {

    }
}

```

### Modules

Modules contain one or more controllers. Controllers need to 
be declared in a module to be accessible through the API. Declaring 
a service as part of a module through the `provides` parameter is
optional.

#### Class Decorator

`Module`

##### Parameters

`controllers`

`modules`

`provides`

##### Example

```
@Module({
    'controllers': [ FooController ],
    'modules': [ BarModule ],
    'provides': [ FooService ]
})
```




## Requisites

You must have the compiler options `experimentalDecorators` and 
`emitDecoratorMetadata` set  to `true` in your `tsconfig.json` file. 
This means that you cannot bundle with `esbuild` which does not 
support these compiler options.

## See Also

[Express](https://www.npmjs.com/package/express)

[Nest.js](https://nestjs.com/)

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
