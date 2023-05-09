import { Component, Input } from "@angular/core";


@Component({
    selector: 'datetime-control',
    templateUrl: './datetime-control.component.html',
    styleUrls: ['./datetime-control.component.scss']
})
export class DateTimeControlComponent {

    @Input() required: false

    @Input() dateLabel: string

    @Input() timeLabel: string
}

