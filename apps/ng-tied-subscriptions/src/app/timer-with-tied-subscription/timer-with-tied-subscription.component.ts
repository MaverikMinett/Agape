import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { include } from '@agape/object';
import { CanTie } from '@agape/ng-tie-subscriptions';

export interface TimerWithTiedSubscriptionComponent extends CanTie { }

@Component({
  selector: 'project-zed-leaky-timer',
  templateUrl: './timer-with-tied-subscription.component.html'
})
@include( CanTie )
export class TimerWithTiedSubscriptionComponent {

  count: number = 0

  ngOnInit() {
    this.tie(
      interval(1000).subscribe( n => {
        this.count++;
        console.log(n); 
      })
    )
  }

}

