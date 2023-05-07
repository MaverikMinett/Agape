import { Component } from '@angular/core';
import { ReplaySubject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'project-zed-leaky-timer',
  templateUrl: './timer-with-take-until.component.html'
})
export class TimerWithTakeUntilComponent {

  count: number = 0

  destroyed = new ReplaySubject<void>(1)

  ngOnInit() {
    interval(1000)
      .pipe( takeUntil(this.destroyed) )
      .subscribe( n => {
        this.count++;
        console.log(n); 
      })
      
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }
  
}
