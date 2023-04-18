# Agape Demo

Test framework with support for interactive terminal applications


## Synopsis

```

use { describe, it, runtests } from '@agape/demo'

describe('FooControl', 'interactive', () => {

    it('should run', () => {
        const c = new FooControl()
        const response = await c.run()
        expect(response).toBeTruthy()
    })

})

runtests()
```


## Summary

Standard testing and assertion using `describe`, `it`, and `expect` to
test interactive node command line applications. Use `fdescribe` and
`fit` to focus in on specific tests.


## Describe

`describe`

Calling `describe` will create a new test suite. Supplying the optional
`interactive` parameter will make all tests in the suite interactive. 

`fdescribe`

Use `fdescribe` to focus on a set of tests. Only tests which have been
focused on will run, all other tests will be skipped.

`xdescribe`

Use `xdescribe` to omit a set of tests. All tests except tests which
have been omitted will be run.

## It

`it`

Calling it will create a new test in the current suite. 

`fit`

Focus on this test. Only this/these tests will run and all other tests
will be skipped. 

`xit`

Skip this test. All other tests will run as described.

## Interactive Tests

Tests which have been marked interactive will output information to the
terminal window regarding the current test being run. The test can then
assume control of the application flow, awaiting user input such as at
a command line, and then display a pass/fail confirmation to the user.


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2023 Maverik Minett


## License

MIT
