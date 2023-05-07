import { Route } from '@angular/router';
import { LeakyTimerComponent } from './leaky-timer/leaky-timer.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { TimerWithTakeUntilComponent } from './timer-with-take-until/timer-with-take-until.component';

export const appRoutes: Route[] = [
    { path: '', component: IndexPageComponent },
    { path: 'leaky-timer', component: LeakyTimerComponent },
    { path: 'take-until', component: TimerWithTakeUntilComponent },
];
