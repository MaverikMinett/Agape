# Agape Demo

Test framework for interactive terminal applications


## Synopsis

```
import { it, fit, xit, describe, fdescribe, xdescribe, expect } 
    from '@agape/demo'


describe('FooComponent', () => {

    it('should instantiate', () => {
        const foo = new FooComponent()
        expect(foo).toBeTruthy()
    })

    describe('run', 'interactive', () => {
        it('should run the component', async () => {
            const foo = new FooComponent()
            const output = await foo.run()
            expect(output).toEqual(...)
        })
        fit('should run only this test', () => {
            ...
        })
        xit('should skip this test', () => {
            ...
        })
    })

})

```

## Summary

A library for testing, developing, and demoing command line applications

## Functions

`describe( description, builder )`

Create a new test suite

`fdescribe( description, builder )`

Focus on this test suite

`xdescribe( description, builder )`

Skip this test suite

`it( description, test )`

Create a new test

`fit( description, test )`

Focus on this test

`xit( description, test )`

Skip this test

`expect(actual).toBe(expected)`

Assertions

`spyOn`

Spy on a method call

`runTests`

Run the tests

## Expect

Assertion lib for validating tests

### Synopsis

```
expect(true).toBeTruthy()

expect(value).toEqual({ 'foo': 'bar' })

expect(value).toBeInstanceOf(Foo)

expect(spy).toHaveBeenCalled()

```

### Matchers

`.toBe(expected)`

`.toEqual(expected)`

`.toBeTruthy()`

`.toBeFalsy()`

`.toBeInstanceOf()`

`.toHaveBeenCalled()`

`.toHaveBeenCalledTimes(n)`

## Spies

Demo comes with it's own `Spy` object which can be used to spy on
method calls. Create a spy using the `spyOn` function.

### Synopsis

```
spyOn(foo, 'bar')
foo.bar()
expect(foo.bar).toHaveBeenCalled()
```

## Running Tests

Run tests in the demo using the `runTests` function. `runtests` must be 
called after all tests have been configured using `describe` and `fit`.

### Synopsis

```
desrcibe('Foo', 'interactive', () => {
    it('should run', () => {
        const f = new Foo()
        await foo.run()
    })
})

runTests()
```

### Configuration

Tests can be split out into multiple files by creating a master/parent
test runner file which imports the other files and then calls `runTests`.

Create a file called `demo.setup.ts` in the root source directory of your application.

```
import { runTests } from '@agape/demo';

import './path/to/foo.demo.ts`
import './path/to/bar.demo.ts`

runTests()

```

Update `ts.config.json` to not export the `demo.setup.ts` file and the `*demo.ts` files so that they do not end up in your `dist` folder.

```
"exclude": ["src/demo.setup.ts", "src/**/*.demo.ts"]
```

Create another `ts.config.json` for running `demo.setup.ts` to run the demos/tests.


*Why do I need to do this?*

Agape Demo is not a completely mature testing framework; it does not have a cli application. Other test runners do this step for you via the `jest` or `karma` command line applications. Future versions may or may not include a cli for handling this step in the testing process.


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
