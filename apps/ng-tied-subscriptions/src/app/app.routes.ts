import { Route } from '@angular/router';
import { LeakyTimerComponent } from './leaky-timer/leaky-timer.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { TimerWithTakeUntilComponent } from './timer-with-take-until/timer-with-take-until.component';
import { TimerWithTiedSubscriptionComponent } from './timer-with-tied-subscription/timer-with-tied-subscription.component';

export const appRoutes: Route[] = [
    { path: '', component: IndexPageComponent },
    { path: 'leaky-timer', component: LeakyTimerComponent },
    { path: 'take-until', component: TimerWithTakeUntilComponent },
    { path: 'tied-subscription', component: TimerWithTiedSubscriptionComponent },
];
