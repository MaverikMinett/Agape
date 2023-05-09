# @agape/ng-tied-subscriptions

Tie subscriptions to the component lifecycle

## Synopsis

```ts
export interface FooComponent extends CanTie { }

@Component(...)
@include( CanTie )
export class FooComponent {

ngOnInit() {

    this.tie(
      this.service.get().subscribe( () => {
        ...
      })
    )

  }
}
```

## Description

Unsubscribe when a component is destroyed to prevent memory leaks

## Traits

`CanTie`

### Methods

`tie( ...subscriptions )`

Tie one more subscriptions to the component so that they are unsubscribed
when the component is destroyed

```
    this.tie(
      this.service.method1().subscribe( () => {
        ...
      }),
        this.service.method2().subscribe( () => {
        ...
      }),
    )
```

## Installation

```
npm install @agape/ng-tied-subscriptions @agape/object @agape/types @agape/string
```

## Author

Maverik Minett  maverik.minett@gmail.com

## Copyright

© 2023 Maverik Minett


## License

MIT
