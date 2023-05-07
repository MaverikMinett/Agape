# @agape/rxjs

Companion library for rxjs

## Synopsis

```
import { tie } from '@agape/rxjs';
import { timer } from 'rxjs';

class Foo {
    constructor( ) {
        tie( this, 'destroy', 
            timer(1000).subscribe( n => console.log(n) )
        )
    }

    destroy() {
        console.log( "Destroying foo" )
    }
}

const o = new Foo()
setTimeout( () => o.destroy(), 10000)
```


## Description

Provides the `tie` function which can be used to unsubscribe from rxjs 
subscriptions when a specified method is called. 

## Functions

### `tie (target, methodName, ...subscriptions)`

Tie subscriptions to a specified object and method call.

####  Angular Example

Prevent memory leaks by clearing the tied subscriptions when a component 
is destroyed.

```
import { tie } from '@agape/rxjs';
import { timer } from 'rxjs';

@Component( ... )
class FooComponent {
    ngOnInit( ) {
        tie( this, 'ngOnDestroy', 
            timer(1000).subscribe( n => console.log(n) )
        )
    }
}
```

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2022 Maverik Minett


## License

MIT
