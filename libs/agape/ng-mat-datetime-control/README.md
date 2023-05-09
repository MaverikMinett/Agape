# @agape/ng-mat-datetime-control

Datetime input field for Angular Material

## Synopsis

```ts
import { AgMatDatetimeControlModule } from '@agape/ng-mat-datetime-control'


@NgModule({
    imports: [
        AgMatDatetimeControlModule
    ]
})
```

```html
<ag-mat-datetime-control
    dateLabel="Date"
    timelabel="Time"
    [required]="false"
    [(ngModel)]="modelValue"
>
</ag-mat-datetime-control>
```

## Description

Accepts a javascript `Date` as a model value and renders separate form
controls for the `date` and `time` components of a `datetime`.

## Author

Maverik Minett  maverik.minett@gmail.com

## Copyright

© 2023 Maverik Minett


## License

MIT
