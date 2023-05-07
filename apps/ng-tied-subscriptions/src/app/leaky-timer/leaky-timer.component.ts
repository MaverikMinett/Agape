import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'project-zed-leaky-timer',
  templateUrl: './leaky-timer.component.html'
})
export class LeakyTimerComponent {

  count: number = 0

  ngOnInit() {
    interval(1000).subscribe( n => {
      this.count++;
      console.log(n); 
    })
  }

}
